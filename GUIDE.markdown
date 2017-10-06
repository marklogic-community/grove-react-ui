# Guide to ML-Treehouse

ML-Treehouse is a set of components designed to help developers build UI-rich applications backed by MarkLogic, the powerful NoSQL database built for enterprises.

The standard front-end stack for ML-Treehouse is React + Redux. In the absence of other requirements, we anticipate most users will stick to that stack - but everything is modular and pluggable, so advanced users can mix-and-match (more below).

The standard back-end is currently a Node.js middle-tier talking to a MarkLogic REST server. It is bundled into this reference application. But, again, other back-ends can be swapped in, such as a Java middle-tier or simply MarkLogic REST extensions themselves, so long as they meet the API contracts defined by our Redux modules.

## What ML-Treehouse Provides

ML-Treehouse provides the following tools for building applications:

- reusable front-end React components (we also have some AngularJS and Vue.js components, and more could be ported to those frameworks if needed),
- Redux modules to manage client-side state and handle interactions with back-end API,
- a default and replaceable Node middle-tier using Express.js.

At the moment, the easiest way to get started with the current standard stack is to clone this repository as [described in the README](README.markdown#very-quick). This repository also includes standard MarkLogic configuration that are deployed using [ml-gradle](https://github.com/marklogic-community/ml-gradle).

This project will eventually be accompanied by tutorials to help developers and architects learn to work with MarkLogic.

## Learning to Customize and Extend Your Application

If this repository works for you as-is, great. But odds are good that you will need to customize or extend it. This is a guide to learning how to do that.

### MarkLogic Configuration

We recommend using [ml-gradle](https://github.com/marklogic-community/ml-gradle) to bootstrap and configure your MarkLogic databases, security, and app servers. This reference application provides a standard configuration in the `marklogic` directory.

You should become familiar with all the MarkLogic automation goodness that [ml-gradle](https://github.com/marklogic-community/ml-gradle) provides, [starting with the project's README](https://github.com/marklogic-community/ml-gradle).

You may need to update, for example, the host, port, or administrative user for your MarkLogic REST server. [ml-gradle makes that easy.](https://github.com/marklogic-community/ml-gradle)

Under the covers, ml-gradle uses the [MarkLogic Content Pump (mlcp)](http://docs.marklogic.com/guide/mlcp) to load data into MarkLogic. MarkLogic provides an [excellent guide to using mlcp](http://docs.marklogic.com/guide/mlcp), and the ml-gradle Wiki describes [how to integrate mlcp with ml-gradle](https://github.com/marklogic-community/ml-gradle/wiki/Content-Pump-and-Gradle).

### The Front-End: React + Bootstrap

The next part of your application you may want to update is the front-end, which lives inside the `client` directory of this reference application.

#### Styling (Look and Feel)

ML-Treehouse React components are styled using [Bootstrap 3](https://getbootstrap.com/docs/3.3/). There are [many](https://startbootstrap.com/) [themes](https://themes.getbootstrap.com/collections/all) [available](https://www.google.com/search?q=bootstrap+themes) to update the look-and-feel of standard Bootstrap classes.

You could, of course, also provide your own custom CSS in `client/src/index.css`.

If you find yourself editing React components, take a look at the [documentation for React-Bootstrap](https://react-bootstrap.github.io/), which is what we use to provide Bootstrap-styled components.

#### Editing or Writing React Presentational Components

We selected React in large part because there are many excellent resources for learning to work with the framework (as well as extending it). To learn React, you should [start with the official React docs](https://reactjs.org/docs/hello-world.html) or [tutorial](https://reactjs.org/tutorial/tutorial.html), which will introduce you to the framework in a highly intuitive way.

The presentational React components are provided through a separate libary: [ml-treehouse-react](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse-react/browse). These components are 'dumb', presentation-only React components that render html based on provided properties and invoke callback functions based on user interaction. (Here is a [good article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) on the useful pattern of dividing an application between 'dumb', presentational components and 'smart' containers. We lean heavily on this pattern in ML-Treehouse.)

The ml-treehouse-react components are imported and used in [`client/src/App.js`](`client/src/App.js`) and [`client/src/containers/MLSearchContainer.js`](`client/src/containers/MLSearchContainer.js`). If you want to change them, you can provide your own components and import those instead. (Your components may also import some of the ml-treehouse-react components, so you don't have to recreate everything.)

## Client-Side State-Management System (using Redux)

TODO
- describe Redux
- arranged as pluggable features ('ducks')
  - store (subscriptions, according to how it is handled in React / Angular)
  - action creators
    - thunks for async actions (middleware)
  - selectors
- the Redux libraries define an interface to the service tier (for example, for communicating with MarkLogic or other Web services)

## Default middle-tier

TODO

- Node
- resource-oriented

## TODO: mix and match

REWRITE: However, these are designed to be modular: our React components can be used without Redux, and our Redux components could be used with a different front-end framework, including AngularJS and Vue.js.
