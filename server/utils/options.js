/* jshint node:true */

'use strict';

module.exports = function() {

  var environment = process.env.NODE_ENV || 'local';
  environment = environment === 'build' ? 'prod' : environment;

  var envJson = getEnvOptions(environment);

  var options = {
    env: environment,
    appName: process.env.APP_NAME || envJson['app-name'] || 'slush-app',
    httpsStrict: bool(process.env.HTTPS_STRICT || envJson.httpsStrict || true),
    // ML CERTIFICATE should be set if "ssl require client certificate" of the ML AppServer is set to true
    mlCertificate: process.env.ML_CERTIFICATE || envJson.mlCertificate || '',
    nodeJsCertificate: process.env.NODEJS_CERTIFICATE || envJson.nodeJsCertificate || '',
    nodeJsPrivateKey: process.env.NODEJS_PRIVATE_KEY || envJson.nodeJsPrivateKey || '',
    appPort: process.env.APP_PORT || process.env.PORT || envJson['node-port'] || '9003',
    mlHost: process.env.ML_HOST || envJson['ml-host'] || 'localhost',
    mlHttpPort: process.env.ML_PORT || envJson['ml-http-port'] || '8003',
    defaultUser: process.env.ML_APP_USER || envJson['ml-app-user'] || 'admin',
    defaultPass: process.env.ML_APP_PASS || envJson['ml-app-pass'] || 'admin',
    guestAccess: bool(process.env.GUEST_ACCESS || envJson['guest-access'] || false),
    disallowUpdates: bool(process.env.DISALLOW_UPDATES || envJson['disallow-updates'] || false),
    appUsersOnly: bool(process.env.APP_USERS_ONLY || envJson['appusers-only'] || false)
  };

  if (options.httpsStrict) {
    console.info('Self signed certificates not allowed.');
  } else {
    console.warn('Allowing self signed certificates. Not advisable on production.');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  return options;

  function getEnvOptions(env) {
    var envJson;
    var envFile = '../../' + env + '.json';
    console.log('envFile:', envFile);

    try {
      envJson = require(envFile);
    } catch (e) {
      envJson = {};
      console.log('Couldn\'t find ' + envFile + '; you can create this file to override properties - ' +
        '`gulp init-local` creates local.json which can be modified for other environments as well');
    }

    return envJson;
  }

  function bool(x) {
    return (x === 'true' || x === true);
  }

};
