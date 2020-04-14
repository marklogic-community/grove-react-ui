# Grove React Components

This library provides a set of React components useful for building applications backed by a MarkLogic database.

### Implementation

These components interact with the host application via the containers in this project.  You may need to make adjustments to these containers, such as adjusting props and callback functions, when making modifications to components.  See the [`SearchContainer`](../containers/SearchContainer.js) for an example of how these hook up.  

### <DetailView />

This component provides a default view of a single document, together with some error handling. It can be customized via props. See: https://marklogic-community.github.io/grove/guides/react/recipes/detail

### <SearchResults />

The default behavior of the SearchResults component is to offer a choice between a CardResult and a ListResult. It can be customized via props. See: https://marklogic-community.github.io/grove/guides/react/recipes/search-results

### Storybook

A storybook for all the components present in this library is provided as part of this project. There is a public copy available at:

    http://grove-components.demo.marklogic.com/

Or you can view it locally by cloning this project, and running:

    npm install && npm run storybook

After that you can typically open it in your browser at:

    http://localhost:9001/

#### Updating Public Storybook

Make sure all changes are committed and pushed. Also make sure you have installed pm2 (`sudo npm install -g pm2`), that you can update all necessary files on the server (they might be published by someone else), and just run:

    pm2 deploy production

Post-install should install, test, and build the components and the storybook. A browser refresh is all one need after that.

## Contributing

The Grove team welcomes contributions!

### Tests

    npm run test

To run the tests continuously as you change files:

    npm run test:watch

To get a report on test coverage:

    npm run test:coverage
    open coverage/html/index.html

### Stories

Best practice is to add a story for each component that gets exported from this library. We are using [Storybook](https://github.com/storybooks/storybook) for this, which is a form of live documentation. At least, there should be a story example for each supported state of the component. It is also possible to make interactive examples, though this is more work. See <Facets /> for an example.

Eventually, we may tie stories together with testing. This could follow the model [described in this article](https://medium.com/@mlthuret/building-a-react-components-living-documentation-using-react-storybook-5f11f0e7d23e).

To create a story for a component, save it as a new file ending with '.story.js'. See the codebase for examples.
