# Advanced Guide to ML-UI-React (Muir)

Muir is designed to help developers and architects build UI-rich applications backed by MarkLogic, the multi-model, enterprise NoSQL database.

The standard front-end stack for Muir is React + Redux. In the absence of other requirements, we anticipate most users will stick to that stack - but everything is modular and pluggable, so advanced users can mix-and-match (more below).

The standard back-end is currently a Node.js middle-tier talking to a MarkLogic REST server. It is bundled into this reference application. But, again, other back-ends can be swapped in, such as a Java middle-tier or simply MarkLogic REST extensions themselves, so long as they meet the API contracts defined by our Redux modules.

## What Muir Provides

Muir provides the following tools for building applications:

- reusable front-end React components (we also have some AngularJS and Vue.js components, and more could be ported to those frameworks if needed),
- Redux modules to manage client-side state and handle interactions with back-end API,
- a default and replaceable Node middle-tier using Express.js.

At the moment, the easiest way to get started with the current standard stack is to clone this repository as [described in the README](README.markdown#very-quick). This repository also includes standard MarkLogic configuration that are deployed using [ml-gradle](https://github.com/marklogic-community/ml-gradle).

This project will eventually be accompanied by tutorials to help developers and architects learn to work with MarkLogic.

## Learning to Customize and Extend Your Application<a name="developing-your-app"></a>

If this application works for you as-is, great. But odds are good that you will need to customize or extend it. This is a guide to learning how to do that.

### MarkLogic Configuration

We recommend using [ml-gradle](https://github.com/marklogic-community/ml-gradle) to bootstrap and configure your MarkLogic databases, security, and app servers. This reference application provides a standard configuration in the `marklogic` directory.

You should become familiar with all the MarkLogic automation goodness that [ml-gradle](https://github.com/marklogic-community/ml-gradle) provides, [starting with the project's README](https://github.com/marklogic-community/ml-gradle).

You may need to update, for example, the host, port, or administrative user for your MarkLogic REST server. [ml-gradle makes that easy.](https://github.com/marklogic-community/ml-gradle)

Under the covers, ml-gradle uses the [MarkLogic Content Pump (mlcp)](http://docs.marklogic.com/guide/mlcp) to load data into MarkLogic. MarkLogic provides an [excellent guide to using mlcp](http://docs.marklogic.com/guide/mlcp), and the ml-gradle Wiki describes [how to integrate mlcp with ml-gradle](https://github.com/marklogic-community/ml-gradle/wiki/Content-Pump-and-Gradle).

### The Front-End: React + Bootstrap

The next part of your application you may want to update is the front-end, which lives inside the `client` directory of this reference application.

<a name="create-react-app"></a>#### Built on Create-React-App

In the Muir React reference application, we have decided to leverage Facebook's [create-react-app project](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md), rather than creating and maintaining a modern javascript build environment ourselves. create-react-app provides most of the dependencies and configuration needed to do things like run tests, start a development server, and create a production build. Best of all, when the create-react-app updates their project, it is a simple process to [update this application](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases) to take advantage.

This indirection could cause some confusion. For example, Webpack is central to build processes, but you may be surprised to see that there is no `client/webpack.config.js` file. Instead, create-react-app provides the necessary configuration.

This optimizes away most maintainance of our build process over time and creates a common experience for developers across all Muir React apps. There are [many ways to customize](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) what is provided. If, however, you find that you need to separate from create-react-app, there is a [way to "eject"](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject). Careful, though, because that is a one-way step: You will not be able to stay up-to-date with create-react-app updates over time.

#### Styling (Look and Feel)

Muir React components are styled using [Bootstrap 3](https://getbootstrap.com/docs/3.3/). There are [many](https://startbootstrap.com/) [themes](https://themes.getbootstrap.com/collections/all) [available](https://www.google.com/search?q=bootstrap+themes) to update the look-and-feel of standard Bootstrap classes.

You could, of course, also provide your own custom CSS in `client/src/index.css`.

If you find yourself editing React components, take a look at the [documentation for React-Bootstrap](https://react-bootstrap.github.io/), which is what we use to provide Bootstrap-styled components.

#### Editing or Writing React Presentational Components

We selected React in large part because there are many excellent resources for learning to work with the framework (as well as extending it). To learn React, you should [start with the official React docs](https://reactjs.org/docs/hello-world.html) or [tutorial](https://reactjs.org/tutorial/tutorial.html), which will introduce you to the framework in a highly intuitive way.

The presentational React components are provided through a separate libary: [ml-treehouse-react](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse-react/browse). These components are 'dumb', presentation-only React components that render html based on provided properties and invoke callback functions based on user interaction. (Here is a [good article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) on the useful pattern of dividing an application between 'dumb', presentational components and 'smart' containers. We lean heavily on this pattern in Muir.)

In particular, the React components are unaware of the Redux layer. They simply define properties and functions that they expect to be passed to them. They are only responsible for rendering an appropriate view based on those properties and for wiring user actions to the passed-in functions.

The ml-treehouse-react components are imported and used in [`client/src/App.js`](`client/src/App.js`) and [`client/src/containers/MLSearchContainer.js`](`client/src/containers/MLSearchContainer.js`).

If you want to change the React components, you can provide your own components and import those instead. (Your components may also import some of the ml-treehouse-react components, so you don't have to recreate everything.)

### Client-Side State-Management System (using Redux)

Redux provides a popular pattern to manage state in a single-page Web or mobile application. Like React, it is surrounded by a rich ecosystem, and the [official Redux docs](http://redux.js.org/) are the best starting point for learning about it. Please read those first! We will not try to explain all of Redux here.

Muir provides Redux modules [organized as 'ducks'](https://github.com/alexnm/re-ducks). This means that your application can import [reducers](http://redux.js.org/docs/basics/Reducers.html) defined in the Redux module to respond to actions and manage part of your Redux state tree.

Each module exposes selectors that your application can use to get information from that part of the state tree.

Each module also defines [actionCreators](http://redux.js.org/docs/basics/Actions.html) that your application can call to, for example, run a search. We are using the [redux-thunk](https://github.com/gaearon/redux-thunk) library to handle asynchronous actions, [as described in the Redux docs](http://redux.js.org/docs/advanced/AsyncActions.html).

Finally, each Redux module currently defines an interface to the service tier (for example, for communicating with MarkLogic or other Web services to run a search). It calls out to a specific endpoint and expects a certain shape of response. We are still fleshing this out, but the goal is to make the service tier completely swappable, so long as an adapter is provided that provides the Redux module the interface that it requires.

At the moment, we provide two modules: [ml-search-redux](https://project.marklogic.com/repo/projects/NACW/repos/ml-search-redux/browse) and [ml-documents-redux](https://project.marklogic.com/repo/users/pmcelwee/repos/ml-documents-redux/browse).

Your application needs to provide some glue to connect the Redux modules to the 'dumb' React components, which are not aware of Redux. This reference application does that, in [`client/src/App.js`](`client/src/App.js`) and [`client/src/containers/`](`client/src/containers/`), which contains 'smart' React containers that are Redux-aware and pass the appropriate properties and functions down to the 'dumb' React components.

If you need to modify the way selectors or actionCreators work, you can create decorator functions that call out to them but also do other work. Then, pass your decorator functions down to the 'dumb' React components instead. Or you could define your own actionCreators or selectors from scratch.

If you are extending this application, you will have to decide whether you are adding new state and whether it should be managed by Redux or not. It is not mandatory. Redux adds some indirection, complexity and constraints in exchange for making state easier to reason about and for assistance integrating different parts of your application. The author of Redux has a good article exploring these trade-offs, called, "[You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)." 

For example, if you create a component that toggle a pop-up on or off, the `popUpStatus` bit of state might properly belong just to your component and would not need to go into the global Redux store. Redux modules are also a central part of the Muir architecture, so if you are planning to make your extension reusable, that would be a point in favor of using Redux for application-wide state. There are many articles out there on this, here is [one of them](https://github.com/gaearon/redux-thunk).

### Default Node middle-tier

The Muir Node server is present in this repository as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules). You can learn more about this reference implementation of a Muir middle-tier in [its repository](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse-node/browse).

## Advanced Use: Mix and Match

We are providing this reference application for ease of use. We may eventually provide a generator for new applications. This allows users to take advantage of defaults and get running quickly.

However, the various parts are designed to be modular.

Our React components can be used without Redux, so long as you pass them the properties and functions that they require. You can even [add React components into an existing application that does not use React elsewhere](https://medium.com/nthrive-analytics/introducing-react-into-an-existing-application-17490841796e).

Our Redux components could be used with a different front-end framework, including AngularJS and Vue.js. We have proved this ourselves, by creating reference applications in AngularJS and Vue.js which reuse the ml-search-redux module.

Similarly, the provided Node middle tier could be swapped out for one implemented in Java or, indeed, in MarkLogic itself.

Feel free to use this reference application for ideas on how to pull in just the Muir plugins that you need for your use case.

## Contributing

We welcome contributions! A big motivation behind this project is to improve code quality through code reuse. Please read our [Best Practices](BEST_PRACTICES.markdown) document to better understand the practices and philosophies that we hope will keep this project cohesive.
