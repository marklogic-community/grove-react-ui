# Grove User Management in Redux

This Redux module for user authentication forms part of the MarkLogic Grove project. In addition to client state management, it handles API calls to a Grove middle-tier. 

## Use

This Redux module was architected to be consumed by the [`<LoginContainer>`](../containers/LoginContainer.js).  Actions and selectors exposed by this module should also be passed along to this container so the module may be connected to the consuming React components.


## 'Ducks' architecture

This roughly follows [the architecture laid out in the re-ducks proposal]( https://github.com/alexnm/re-ducks/blob/f28ecc59d43542b8353948ede0cd3a059ca177dd/README.md):

Specifically, the actionCreators and selectors are the primary external UI. State and reducers should be an implementation detail.
