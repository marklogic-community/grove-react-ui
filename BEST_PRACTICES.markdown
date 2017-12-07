# ML-Treehouse Best Practices Guide

This is a living, breathing document describing our current understanding of best practices when building a single-page Web application backed by MarkLogic. Building software is half-craft, half-engineering and specific requirements vary, so your mileage may vary.

The advice here aims to be framework-agnostic, though many specific examples will necessarily use some framework.

Feedback, including violent but respectful disagreement, is welcome. We are not trying not to be overly controversial or innovative, but rather to pull together ideas with wide community acceptance. Often it is not important that we have *the right* answer, but rather that we have a *common* answer.

## Reduce burden on users, including developers

We want to encourage adoption and learning, not to burden users who may not be used to command-line interfaces and complex dependency trees.

That advice is a bit vague, but it includes:

- presenting a simple interface to developers using ML-Treehouse. This might include:
  - providing a single executable to start an application,
  - wrapping up common command-line commands into a simple build script and diverting complex STDOUT into a log file, accessible for debugging,

- erroring quickly when appropriate and providing clear error messages,

- Document, document, document. And test your documentation by using it yourself each time you perform a task, pushing corrections and clarifications back to the project.

- Minimizing dependencies. Modern web applications are built on piles of dependencies. But think about it before adding it to package.json. Is it worth the trade-off? Does it have an acceptable open-source license? Will it eventually stop being maintained or make your application harder to install in a customer's security-hardened environment?

## Modular and Pluggable Architecture

Introducing clear separation of concerns is particularly important for application components designed to work in many unique applications and to be composable together. The goal is to reduce hard-coded dependencies as much as is feasible.

First, present simplicity (search bar plus facets). Then offer easy ways to layer in complexity (search suggestions, eg).

### Application-State Management Layer

TODO: Redux

- actions and selectors as primary interface (plus the store itself, but should only be used for dispatch and passing to selectors; sometimes sharing actionTypes as well)

#### Model Application State for Front-End Needs

Application state structure should not be oriented toward the needs of your back-end. Otherwise put: don't let the back-end abstractions leak into the front end.

Instead, model the state as it makes sense for the front-end, then create adapters for communication with the backend.

This allows you to support other backends and makes it clear exactly what properties and functions the front-end needs to do its job.

### Middle-Tier as Interface

Wrap the middle tier in a service object: code against the documented interface of that service object.

Service objects themselves define a documented interface with the middle-tier and should code against that interface.

#### Wrap APIs in Javascript objects

TODO: create API wrappers as objects containing functions. Your application should work against these objects, which translate function calls into API calls - and API responses into front-end Javascript objects. Whenever possible, inject this API object as a dependency into your components, etc.

Setting things up this way allows someone else to provide a new API object to wrap a different API (perhaps running directly against MarkLogic and dispensing with a middle-tier altogether), but reuse the same front-end.

### Separate "Smart" and "Dumb" (or "Presentational") Components

As componentization as taken over Web frameworks, there is a cross-framework pattern of separating presentational components from smart containers.

TODO: further reading

#### Presentational ("Dumb")

Presentational components are concerned only with:

- rendering a view based on input properties
- responding to user interaction by invoking passed-in callbacks or emitting events
  - AngularJS and Vue.js tend to expect event emission, but can also take callbacks
  - TODO: should we always pass in functions (which tend to be bound action creators in the context of Redux?)

Presentational components should be kept unaware of overall state. They should not know that Redux is managing state for them. They should not know how to invoke middle-tier APIs. Pull them into some other application and pass them the right inputs (data properties and input functions), and they should happily function in any context.

Presentational components can render children components, including 'smart' children.

#### Smart Components (or "Containers")

Smart components are concerned only with:

- rendering the correct child components
- passing the correct bits of state to those children
  - parts of the Redux state
- passing callback functions to children for event handling OR handling events emitted by children
  - Redux action creator functions

Smart components should not contain presentational information, such as HTML markup. Rather, they render child components.

Smart components are typically Redux-aware, and they may also be aware of objects wrapping middle-tier API services. To the extent possible, however, it may be desirable to isolate knowledge of middle-tier objects and even Redux itself in a small number of high-level containers. (TODO: examples of this last sentence; is this true and possible?)

Smart components are conceptually considered higher-level than dumb components, but they may not always be higher in the application's tree of components. It is common to have smart containers nested below presentation-only components. For example, a presentational DetailPageComponent may contain an ItemGraphContainer and a SimilarItemsContainer. Framework-specific Redux sugar usually provides ways for such nested containers to access the global store without

- TODO: example of a React Provider; also how to do it in Angular and Vue

could apply themes by conditionally 

## Tests

### Unit Tests

#### Unit Testing Redux

TODO: just link to the Redux docs and mention any overrides of the advice there?

#### Unit Testing Presentational ("Dumb") Components

- Start with smoke tests.
- Test that the component renders correctly, given various inputs.
- Test that the component invokes the right functions or emits the correct events with the correct arguments, given events such as user-interaction.

#### Unit Testing Smart Components

- Start with smoke tests.

### Integration (End-to-End) Tests

## Linting

Javascript is an overly permissive language, and there are many "bad parts." A good linter prevents you from using those bad parts and can also create a consistent style among may developers.

Every project should adopt a common linter and linting configuration. To the extent possible, it is nice to bring this into sync across an organization.

We recommend [ESLint](https://eslint.org/) as the linting program. It has plugins for all the code editors we know of ([install one!](https://eslint.org/docs/user-guide/integrations#editors)). You should also [make it part of your build](https://eslint.org/docs/user-guide/integrations#build-systems) for those new devs who haven't installed a plugin yet.

Over code style, developers could argue endlessly. For this reason, we recommend short-circuiting the discussion by adopting the [Javascript Standard Style](https://standardjs.com/). (If the lack of semicolons is a non-starter for your team, try the slightly modified [Javascript Semi-Standard Style](https://github.com/Flet/semistandard).) If this makes you change how you code, hang in there, you'll get used to it. ;-)

## Typing

We are trying to minimize the learning curve for new developers, so adoption of a typing system should be completely optional for applications consuming ml-treehouse libraries. 

That said, it may be useful for a library to adopt a typing system and it may be possible to hide that bit of complexity from the consuming application. TypeScript and Flow are options. Feedback welcome on recommendations here.

## Version Control

Use git.
