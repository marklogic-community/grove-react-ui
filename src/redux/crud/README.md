# MarkLogic Document Management using Redux

This is a Redux implementation for interaction with MarkLogic documents in the browser. It forms part of the MarkLogic Grove project. 

## Use

This Redux module was architected to be consumed by the [`<DetailContainer>`](../containers/DetailContainer.js) and the [`<CreateContainer>`](../containers/CreateContainer.js).  Actions and selectors exposed by this module should also be passed along to these containers so the module may be connected to the consuming React components.


## 'Ducks' architecture

This roughly follows [the architecture laid out in the re-ducks proposal]( https://github.com/alexnm/re-ducks/blob/f28ecc59d43542b8353948ede0cd3a059ca177dd/README.md):

Specifically, the actionCreators and selectors are the primary external UI. State and reducers should be an implementation detail.
