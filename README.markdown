# MarkLogic Treehouse

This project is the initial development effort for MarkLogic Treehouse, which
aims to deliver a search and discovery application, along with a pluggable
architecture, that can be the basis for single-page Web applications backed by
MarkLogic. Various parts of this will be broken into separately-maintained and
versioned projects. There will be a generator that will assemble something like
this application by default.

This application is VERY alpha and will change considerably in many breaking ways.

## Getting Started

### Prerequisites

1. Install MarkLogic 9.
2. Install node.
3. Install java.
4. Install gradle.

`npm install` in both client and server and at top-level? (We should package this up.)

    npm install
    cd client && npm install && cd ..
    cd server && npm install && cd ..

### Temporary `npm link` - this is very dirty; we will clean it up

This host application depends on two libraries that have not yet been published
to the npm package manager. Start by cloning both of these somewhere on your
machine and using `npm link` to create a global Node symlink to those
directories.

The first is currently called simply
[`ml-treehouse`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse),
though that name will change soon: It is the repository with front-end React
components.

    git clone ssh://git@project.marklogic.com:7999/nacw/ml-treehouse.git
    cd ml-treehouse
    npm link

The second is
[`ml-search-redux`](https://project.marklogic.com/repo/users/pmcelwee/repos/ml-search-redux/browse),
which contains the implementation of search in the Redux state-management
system.

    git clone ssh://git@project.marklogic.com:7999/~pmcelwee/ml-search-redux.git
    cd ml-search-redux
    npm link

Now, come back to this application (`ml-treehouse-host-app`), change into the `client` directory and complete the links:

    cd client
    npm link ml-treehouse
    npm link ml-search-redux

Now, you are going to get an error because you have two instances of React, one in your host app, one in the React component `ml-treehouse` directory.

That error looks like:

    addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).

To fix it, link the 'ml-treehouse' version of React back to the host version of React:

    cd ../ml-treehouse
    npm link ../ml-treehouse-host-app/client/node_modules/react

### Configure MarkLogic

Run:

    cd marklogic && gradle mlDeploy && cd ..

### Load Data

Run this to load sample data:

    cd marklogic && gradle importSampleData && cd ..

### Start the web application

Run:

    npm start

Then navigate to `localhost:3000`.

## Developing

Start the test runner:

    cd client && npm test && cd ..
