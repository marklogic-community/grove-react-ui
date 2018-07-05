# MarkLogic UI Resources (Muir) React-Redux-Node Template

Muir (rhymes with 'pure') is a framework to help developers and architects build UI-rich applications backed by MarkLogic, the multi-model, enterprise NoSQL database.

Every Muir Project consists of a one or more middle-tier or UI Applications. Those Applications communicate using defined Muir APIs (at least for core functions: you can also create ad-hoc extensions). Application-behavior is generally added by installing Plugins,which are versioned and thus can be upgraded over the life of the Project.

This particular repository contains a Template for the initial reference Muir Project. A Project based on this Template consists of a Node Express middle-tier and a React-Redux front-end. This reference Template provides a simple search and discovery application.

Muir and this Project are *alpha* and are still changing often in breaking ways.

## Create a Project Based on this React-Redux-Node Template

The commands listed below should be typed into a terminal/console window.

### <a name="prerequisites"></a>Prerequisites

1. [Install MarkLogic 9](https://developer.marklogic.com/products), start it, and initialize it at `localhost:8001`.
2. Check if you already have Node.js version 8 or above installed by running `node -v`. If not, [install Node.js](https://nodejs.org). 
3. Check if you already have npm version 5 or above installed by running `npm -v`. If not, run `npm install -g npm` to get the latest.
4. Check if you already have Java 1.8 or above installed by running `java -version`. If not, [install Java 1.8](https://www.java.com/en/download/help/download_options.xml). Java is required because the generated Muir project will use [ml-gradle](https://github.com/marklogic-community/ml-gradle) to administer MarkLogic and [mlcp](https://developer.marklogic.com/products/mlcp) to load data.

### muir-cli

The [muir-cli](https://project.marklogic.com/repo/users/pmcelwee/repos/muir-cli/browse) is the best way to install and configure new MUIR Projects. This project is currently under development and not yet published publicly. Run the following to install the Muir CLI:

    git clone https://project.marklogic.com/repo/scm/~pmcelwee/muir-cli.git
    cd muir-cli
    npm install -g

This makes the `muir` command available on your command-line.

### Quick Start

This is the standard way to create a new Project using this template, if you expect to make modifications to it or load your own data.

#### Generate a new Project:

    muir new your-project-name
    cd your-project-name

#### Configure your project:

    muir config

This command will update settings in your React UI, Node middle-tier, and the provided ml-gradle project.

#### Provision MarkLogic

We provide an ml-gradle configuration that matches your Muir settings as a convenience in the `marklogic` directory of your generated Project.

    cd marklogic
    ./gradlew mlDeploy
    cd ..

Or, on Windows:

    cd marklogic
    gradlew.bat mlDeploy
    cd ..

#### Install npm dependencies

Run from the top-level of your generated Project:

    npm install

#### Start development servers to run your MUIR Project

Run from the top-level of your generated Project:

    npm start

#### Optional: Load sample data

This command uses [ml-gradle](https://github.com/marklogic-community/ml-gradle) and [mlcp]() to load 3000 sample json documents, about people. These documents are stored in the `marklogic/data` directory of this source code.

This Template includes ml-gradle in the `marklogic` directory. You must be in that directory to invoke ml-gradle commands.

    cd marklogic
    ./gradlew loadSampleData
    cd ..

Or, on Windows:

    cd marklogic
    gradlew.bat loadSampleData
    cd ..

### <a name="very-quick"></a>VERY Quick Start

This sections leverages the `muir demo` command, which is designed for limited use cases. In most cases, it is not appropriate for normal Project development. But, if all prerequisites are in place, it will quickly start a running MUIR Project loaded with sample data.

First, start MarkLogic. Then, the following muir-cli command will clone the application source code, create a content database, create a modules database, create a MarkLogic REST server, load sample people data, install the Web app dependencies locally, and start your application.

    muir demo your-demo-name

The muir-cli will walk you through the creation of a running Muir project, based on the code in this repository.

## About Projects Based on this Template

The reference project includes three directories: 'ui' (for Vue.js front-end and Redux client-state management code), 'middle-tier' (for a reference Node implementation of a middle-tier), and 'marklogic' (for database configuration and sample data loading).

When you run commands like `npm install` and `npm start` from the top-level, it automatically runs the relevant commands. For example, `npm install` installs npm dependencies within the Node `middle-tier` and the `ui` application. Similarly, `npm start` starts the Node middle-tier, as well as a Webpack development server to serve up HTML, Javascript and CSS on port 3000.

The `ui` part of this project was built using the [Create-React-App library](https://github.com/facebookincubator/create-react-app), in order to rely on expert community help in staying up-to-date as the ecosystem changes. Much configuration is done using the tools provided by that library. Please refer to their extensive [User Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) to understand how to configure various parts of the `ui` application.

## Developing your project

To run the tests:

    npm test

To start a development server at `localhost:3000`:

    npm start

For more discussion about how to make changes to your Muir project see the "Learning to Customize and Extend Your Application" section of [GUIDE.markdown](docs/GUIDE.markdown#developing-your-app) in this repository.

## Customizing

As you work with your Muir Project, you will soon want to customize it. To understand the design of the UI-Toolkit and how to customize it to your needs, is most important to understand how to use Muir to quickly create a MarkLogic-backed project - and then to customize it. For this, please *read [the Advanced Guide to Muir Guide](docs/GUIDE.markdown)*.

For those seeking to contribute to the project, our evolving [Best Practices document](docs/BEST_PRACTICES.markdown) are designed to get contributors on the same page and to communicate some of our goals. The [Contributing document](docs/CONTRIBUTING.markdown) has additional concrete advice for contributors. Please read both.

## Developing Pieces of Muir Itself 

**NOTE: This section is currently out-of-date! Updates coming soon.**

For those seeking to contribute to the project, our evolving [Best Practices document](docs/BEST_PRACTICES.markdown) are designed to get contributors on the same page and to communicate some of our goals. The [Contributing document](docs/CONTRIBUTING.markdown) has additional concrete advice for contributors. Please read both.
