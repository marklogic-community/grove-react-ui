# Contributing to the ML-UI-Toolkit

## Creating a new reusable feature

When developing a new reusable feature for the ML-UI-Toolkit project (that is, one destined to become part of the framework), there are basically 5 design layers. (These might be important considerations if you are developing something app-specific too, but that's up to you.)

1. UI (React components) and what they need in terms of pieces of information and functions to invoke - if using Redux, they will get the info from "selectors" and the functions will be "action creators" -> but Redux doesn't absolutely need to be used here, any functions / data will do.

    The core components will live inside the ml-treehouse-react   project. Less-used components might go inside their own separate component libraries.

2. client-side state - will there be any? If so, how should you model it? The Redux docs will be important guides here. You'll also be crafting the selectors and actions that you'll expose to the UI above. I find it very useful to start by writing tests, asserting the results of selectors before and after calling actions. This can drive your modeling of a good state shape.

    If you are including client-side state, is this a logical extension to an existing Redux module, or will you create a new top-level module?

3. API object and API contract. The API object is a small abstraction to allow users to provide different API interfaces by providing different API objects - I usually build it up iteratively. For example, just 'post' uploaded docs inline in the action creator at first, later pull it out into an object like `{ uploadDoc: () => {...} }`. That will become your default API object, which knows how to call the default backend (probably an endpoint in the Node middle-tier). You then will add a mechanism for providing a different API implementation object.

    The shape of the results returned from the API object is the   first implementation of your API contract. Therefore, the API object is essentially an adapter and should perform any necessary conversions from backend response to the shape of   the API contract expected on the client.

4. Default backend implementation. Currently, this will usually be an endpoint in the default Node middle-tier, which itself calls out to MarkLogic. Other users could create implementations in, eg, a Java middle-tier, or as a MarkLogic REST extension, providing matching API objects as described above.

5. MarkLogic server code. Do you need a REST extension to support the backend implementation? So far, we have not created such extensions as part of the core offering. When we do, I imagine that we will leverage [mlpm](https://github.com/joemfb/mlpm), integrating it with ml-gradle to provision the MarkLogic server.

In addition to these considerations, there is of course the question of packaging. Which features belong together? Which should be in a separate library? Communication among contributors should help to shape such packaging decisions.
