# MarkLogic UI-React / UI-Resources (Muir) Welcome Tutorial

Welcome!

If you are here, you probably already know that [MarkLogic](http://www.marklogic.com/what-is-marklogic/) is a powerful, multi-model, NoSQL database with ACID transactions and top-grade security. You can use it to build all kinds of applications.

While working through this tutorial, you will use pieces of this Muir (rhymes with 'pure') library to quickly build a single-page Web application backed by MarkLogic.

A quick, but important, aside: The tech stack used here (React, NodeJS, etc) is by no means required to work with MarkLogic. **You can use your preferred tools to build a Web application backed by MarkLogic.** MarkLogic exposes a rich and extensible [REST API](https://docs.marklogic.com/guide/rest-dev). Any tool capable of making http requests can be used to build an app against MarkLogic.

This tutorial will also expose you to core MarkLogic concepts in action. MarkLogic is a powerful database with equally powerful abstractions that differ in fascinating and useful ways from relational ways of thinking. This Welcome tutorial is useful for getting your feet wet and hands dirty. For more theoretical background, consider also reading MarkLogic's[ "Concepts Guide"](https://docs.marklogic.com/guide/concepts/overview).

Let's get started.

## Prerequisites

This tutorial requires you to interact, at times, with a command line. Before continuing, you should be sure you have a command-line terminal you are comfortable using.

Other dependencies will be pointed out when the need for them arises.

## Get MarkLogic Running

1. **[Download MarkLogic 9.](https://developer.marklogic.com/products)**

    MarkLogic provides a free [Developer License](https://developer.marklogic.com/free-developer) to everyone who [joins the MarkLogic developer community](https://developer.marklogic.com/people/signup). So following this tutorial won't cost you a thing!

2. **Install MarkLogic.**

    The docs have a handy [Installation Guide](https://docs.marklogic.com/guide/installation/procedures#id_28962).

3. **Start MarkLogic.**

    The docs also tell you [how to start MarkLogic on your system](https://docs.marklogic.com/guide/installation/procedures#id_92457).

4. **Initialize MarkLogic to run on a single host computer.**

    The first time you start MarkLogic, you are going to initialize it to run on a single host. Again, [the docs are clear on how to do it](https://docs.marklogic.com/guide/installation/procedures#id_60220). (MarkLogic can powerfully scale and prevent data loss when hardware fails by [running in clusters](https://docs.marklogic.com/guide/cluster), but you won't need all that power for this tutorial.)

    Remember what admin password you set up. You'll need that later, but you probably realized that.

You are ready to move on if you can point a browser to [localhost:8001](http://localhost:8001) and it looks a bit like [this](https://docs.marklogic.com/guide/concepts/admin-monitoring#id_14747): 

![MarkLogic Admin UI](https://docs.marklogic.com/media/apidoc/9.0/guide/concepts/admin-monitoring/images/admin-ui.gif)

There is a [complete description of the Admin Interface in the docs](https://docs.marklogic.com/guide/admin/admin_inter), but for now, it is enough for us to know that MarkLogic is running.

(We recommend using the [Chrome browser](https://www.google.com/chrome/) for this tutorial, by the way, so you can use all the great developer tools available for React and Redux.)

## Get the ML-UI-React Source Code

Clone down the reference application provided by the Muir project. For this, you will need to have a command-line terminal and [git](https://git-scm.com/downloads) for version-control.

    git clone --recursive ssh://git@project.marklogic.com:7999/nacw/ml-treehouse.git ml-ui-react
    cd ml-ui-react
 
The reference application has everything you need to get a search-and-discovery application running. We'll describe it all in more detail below, but just to orient you, be aware that this source code includes:

- a `marklogic` directory, with tools and configuration files to configure and administer your MarkLogic server,
- a `server` directory, with a Node server that will form the middle-tier of this application, and
- a `client` directory, which contains code that will run in the browser.

## Provision MarkLogic

### Install Java Locally

On your command-line, run the following command to see if you have Java 1.7 or higher installed:

    java -version

If not, [install Java](https://www.java.com/en/download/help/download_options.xml).

Once the command above shows version 1.7 or above, you are ready to provision MarkLogic using ml-gradle.

### Provision MarkLogic with ml-gradle

ml-gradle is a community-supported tool that lets you and your team manage MarkLogic via automated tasks that run based on configuration files placed under version control. In this tutorial, we will use some of the most common ml-gradle tasks. For background and an appreciation of all the MarkLogic management tasks that you can automate, [take a look at the ml-gradle docs](https://github.com/marklogic-community/ml-gradle).

## Start the ML-UI-React Application

### Install Node.js Locally

As you develop your application, you will use Node.js in development for things like pulling down useful code libraries from Node's package management system. Don't worry, this doesn't mean that you have to use it in production if you don't want to or can't in your environment.

Check if you have Node version 6 or above by running the following command:

    node -v

If not [follow the instructions at the Node.js website to install a Node for your operating system](https://nodejs.org). 

Once `node -v` is showing you version 6 or above, let's double-check that you have version 5 or above of Node's package manager, npm:

    npm -v

If it is less than version 5, or you just want the latest, run the following to install the latest globally on your computer:

    npm install -g npm

Great, time to get the application running ...

## Load Some Sample Data with the MarkLogic Content Pump (mlcp)


