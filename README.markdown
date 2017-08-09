# MarkLogic Treehouse

This project is the initial development effort for MarkLogic Treehouse, which
aims to deliver a search and discovery application, along with a pluggable
architecture, that can be the basis for single-page Web applications backed by
MarkLogic. Various parts of this will be broken into separately-maintained and
versioned projects. There will be a generator that will assemble something like
this application by default.


## Getting Started

### Prerequisites

1. Install MarkLogic 9.
2. Install node.
3. Install java.
4. Install gradle.

### Configure MarkLogic

Run:

    cd marklogic && gradle mlDeploy && cd ..

### Start the web application

Run:

    cd client && npm start

Then navigate to `localhost:3000`.

## Developing

Start the test runner:

    cd client && npm test && cd ..
