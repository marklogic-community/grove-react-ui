# MarkLogic UI Toolkit

The ML-UI-Toolkit is designed to help developers and architects build UI-rich applications backed by MarkLogic, the multi-model, enterprise NoSQL database.

This specific repository contains the primary reference application for the ML-UI-Toolkit. Eventually, we envision an application generator ([contributions](docs/CONTRIBUTING.markdown) welcome). For now, clone this repository in order to get the latest UI-Toolkit functionality.

This reference application uses React as the front-end Javascript framework (we also provide tools for other frameworks) and Node.js as a default, swappable middle-tier implementation. It provides a search and discovery application, along with a pluggable architecture, that can be the foundation for single-page Web applications backed by MarkLogic.

The ML-UI-Toolkit and this application are *beta* and may change in breaking ways.

## DO THIS FIRST

If this is your first time using the MarkLogic UI-Toolkit, we recommend following our [Welcome Tutorial](docs/WELCOME_TUTORIAL.markdown). The Welcome Tutorial will show you how to quickly create a MarkLogic-backed application using the UI-Toolkit. It also aims to expose new developers and architects to core MarkLogic concepts.

## THEN READ THIS

As you work with the ML-UI-Toolkit, you will soon want to customize it. To understand the design of the UI-Toolkit and how to customize it to your needs, is most important to understand how to use the ML-UI-Toolkit to quickly create a MarkLogic-backed application - and then to customize it. For this, please *read [the Advanced Guide to the ML-UI-Toolkit Guide](docs/GUIDE.markdown)*.

For those seeking to contribute to the project, our evolving [Best Practices document](docs/BEST_PRACTICES.markdown) are designed to get contributors on the same page and to communicate some of our goals. The [Contributing document](docs/CONTRIBUTING.markdown) has additional concrete advice for contributors. Please read both.

## Other Supported Front-end Frameworks

React is one of three supported front-end frameworks. We also support AngularJS and Vue.js for tutorials demonstrating how to work with MarkLogic. 

There is also a reference application for Angular. --> TODO: Link coming soon.

There is a reference application for Vue.js. --> TODO: Link coming soon.

## Quick Start

The commands listed below should be typed into a terminal/console window.

### <a name="prerequisites"></a>Prerequisites

1. [Install MarkLogic 9](https://developer.marklogic.com/products), start it, and initialize it at `localhost:8001`.
2. Check if you already have Node.js version 6 or above installed by running `node -v`. If not, [install Node.js](https://nodejs.org). 
3. Check if you already have npm version 5 or above installed by running `npm -v`. If not, run `npm install -g npm` to get the latest.
4. Check if you already have Java 1.8 or above installed by running `java -version`. If not, [install Java 1.8](https://www.java.com/en/download/help/download_options.xml).

### <a name="very-quick"></a>VERY Quick Start

First, start MarkLogic. Then, the following three commands will clone the application source code, create a content database, create a modules database, create a MarkLogic REST server, load sample people data, install the Web app dependencies locally, and start your application.

    git clone --recursive ssh://git@project.marklogic.com:7999/nacw/ml-treehouse.git
    cd ml-treehouse
    npm run setupEverything

Go to `localhost:3000` and view your running app, with sample data loaded. If
it works, you can skip the remaining steps. If you prefer to go more slowly and see each step (or load different data), please follow the steps below.

### More About Installation: Step-by-Step

Check out our [Installation Guide](docs/INSTALL.markdown) for more detailed, step-by-step installation instructions.

## About the Reference Application

The reference application includes three directories: client (for Vue.js front-end and Redux client-state management code), server (for a reference Node implementation of a middle-tier), and marklogic (for database configuration and sample data loading).

When you run commands like `npm install` and `npm start` from the top-level, it automatically runs the relevant commands. For example, `npm install` installs npm dependencies within the Node `server` and the `client` application. Similarly, `npm start` starts the Node middle-tier, as well as a Webpack development server to serve up HTML, Javascript and CSS on port 3000.

The `client` part of this application was built using the [Create-React-App library](https://github.com/facebookincubator/create-react-app), in order to rely on expert community help in staying up-to-date as the ecosystem changes. Much configuration is done using the tools provided by that library. Please refer to their extensive [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) to understand how to configure various parts of the `client` application.

## Developing your application

To run the tests:

    npm test

To start a development server at `localhost:3000`:

    npm start

For more discussion about how to make changes to your application see the "Learning to Customize and Extend Your Application" section of [GUIDE.markdown](docs/GUIDE.markdown#developing-your-app) in this repository.

## Developing Pieces of the ML-UI-Toolkit Itself 
For those seeking to contribute to the project, our evolving [Best Practices document](docs/BEST_PRACTICES.markdown) are designed to get contributors on the same page and to communicate some of our goals. The [Contributing document](docs/CONTRIBUTING.markdown) has additional concrete advice for contributors. Please read both.
