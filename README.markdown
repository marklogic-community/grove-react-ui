# MarkLogic Treehouse

This project is the primary reference application for the MarkLogic Treehouse project. Eventually, we anticipate providing a generator that will generate a simple, application starter. For now, clone this repository in order to get the latest Treehouse functionality using React.

This reference application uses React as the front-end framework and Node.js as a default, swappable middle-tier implementation. We aim to deliver a search and discovery application, along with a pluggable architecture, that can be the basis for single-page Web applications backed by MarkLogic.

ML-Treehouse and this application are VERY alpha and will change considerably in many breaking ways.

## About ML Treehouse

TODO: Coming soon, an overview.

- Our evolving [Best Practices document](BEST_PRACTICES.markdown), designed to get contributors on the same page, communicates some of our goals.

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

Check out our [Installation Guide](INSTALL.markdown) for more detailed, step-by-step installation instructions.

## About the Reference Application

The reference application includes three directories: client (for Vue.js front-end and Redux client-state management code), server (for a reference Node implementation of a middle-tier), and marklogic (for database configuration and sample data loading).

### Client code

TODO: Vue.js and Redux

### ML-Treehouse-Node Server

The ML-Treehouse-Node server is present in this repository as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). You can learn more about this reference implementation of a ML-Treehouse middle-tier in [its repository](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse-node/browse).

If you forgot to use the `--recursive` flag while cloning and have an empty `server directory`, you should pull in the code in the server directory by running:

    git submodule init
    git submodule update

### MarkLogic

TODO: explain ml-gradle and mlcp

## Developing

Start the test runner:

    npm test
