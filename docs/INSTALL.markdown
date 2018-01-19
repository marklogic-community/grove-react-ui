# Install this reference application for the ML-UI-Toolkit

First, make sure you have installed [the prerequisites](README.markdown#prerequisites).

If you prefer, you can follow the [VERY Quick Start instructions](README.markdown#very-quick) instead. The following instructions guide you through each step of the installation, with more description of what each step does.

## Clone the Application Source Code

You can simply clone this repository in order to get a working version of a Vue application using ml-treehouse modules and reference middle-tier Node server. To do this, you will clone using the `--recursive` flag. This is because we are using a git submodule to pull in the Node middle-tier from a separate repository. Your clone operation will look like this:

    git clone --recursive  ssh://git@project.marklogic.com:7999/nacw/ml-treehouse.git

If you forgot to add the `--recursive` flag and your `server` directory is empty, there are instructions below on how to update the git submodule.

## Install Application Dependencies

This command instructs npm, the Node.js package manager, to install javascript dependencies for client and server code. These will be stored locally in the `node_modules` directories within `client` and `server`:

    npm install

## Configure MarkLogic

This command uses [ml-gradle](https://github.com/marklogic-community/ml-gradle) to create a content database, a modules database, a MarkLogic REST server, and application users and security roles, based on configuration files in the `marklogic` directory of this source code. It also loads custom MarkLogic server-side code for this application:

    npm run mlDeploy

### Load Data

This command uses [ml-gradle](https://github.com/marklogic-community/ml-gradle) and [mlcp]() to load 3000 sample json documents, about people. These documents are stored in the `marklogic/data` directory of this source code.

    npm run loadSampleData

### Start the web application

This command will actually start three servers concurrently:

- a Webpack development server, defaulting to port 3000, to serve the Web app files and proxy other requests to the Node middle-tier,
- the Node middle-tier express.js server, defaulting to port 9003, and
- a Redux DevTools Websockets server at 18055. This allows you to use [Redux Remote DevTools](https://github.com/zalmoxisus/remote-redux-devtools) to monitor and inspect your application.

    npm start

Then navigate to `localhost:3000` to see your running application!
