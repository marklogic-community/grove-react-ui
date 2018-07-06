# MUIR-React-Redux UI

This is a React UI designed to be used in conjunction with a MarkLogic UI Resources (MUIR) middle-tier. It uses Redux for application state management.

## Quick Start

Note that this UI expects a MUIR API-spec compliant middle-tier to be available at the location specified in the `proxy` field of the `package.json` located in this directory.

    npm install
    npm start # Starts a Webpack development server

## Installation

This UI can be generated using the [muir-cli](https://project.marklogic.com/repo/users/pmcelwee/repos/muir-cli/browse).

You can install npm dependencies with the following command:

    npm install

## Start the Application

Note that this UI expects a MUIR API-spec compliant middle-tier to be available at the location specified in the `proxy` field of the `package.json` located in this directory.

    npm start

## Run the Tests

    npm test

## Configuration

Best practice is to use the muir-cli to configure the application from the parent directory, so that it can coordinate configuration with the MUIR middle-tier:

    cd ..
    muir config

The only configuration needed by this UI out-of-the-box is the `proxy` setting in `package.json`. It should point to the host and port where a MUIR API-spec compliant middle-tier is running and available. (The Webpack development server uses this to proxy requests that do not refer to assets within this UI to the MUIR middle-tier. This avoids CORS issues. [See the create-react-app docs for more information.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development))

## Create-React-App User Guide: Much more information on extending this application

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the create-react-app user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
