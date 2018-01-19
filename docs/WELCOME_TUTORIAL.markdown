# MarkLogic UI-Toolkit Welcome Tutorial

Welcome!

If you are here, you probably already know that [MarkLogic](http://www.marklogic.com/what-is-marklogic/) is a powerful, multi-model, NoSQL database with ACID transactions and top-grade security. You can use it to build all kinds of applications.

While working through this tutorial, you will use pieces of the ML-UI-Toolkit to quickly build a single-page Web application backed by MarkLogic.

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

You are ready to move on if you can point a browser  to [localhost:8001](http://localhost:8001) and it looks a bit like [this](https://docs.marklogic.com/guide/concepts/admin-monitoring#id_14747): 

![MarkLogic Admin UI](https://docs.marklogic.com/media/apidoc/9.0/guide/concepts/admin-monitoring/images/admin-ui.gif)

(We recommend using the [Chrome browser](https://www.google.com/chrome/) for this tutorial, by the way, so you can use all the great developer tools available for React and Redux.)

## Get the UI-Toolkit Source Code

Clone down the reference application provided by the UI-Toolkit. For this, you will need to have a command-line terminal and [git](https://git-scm.com/downloads) for version-control.

    git clone ssh://git@project.marklogic.com:7999/nacw/ml-treehouse.git ml-ui-toolkit
    cd ml-ui-toolkit
 
The reference application has everything you need to get a search-and-discovery application running. We'll describe it all in more detail below, but just to orient you, be aware that this source code includes:

- a `marklogic` directory, with tools and configuration files to configure and administer your MarkLogic server,
- a `server` directory, with a Node server that will form the middle-tier of this application, and
- a `client` directory, which contains code that will run in the browser.
