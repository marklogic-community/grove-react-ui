/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

import reducer, { selectors } from './';
import * as actions from './actions';

describe('READ', () => {
  const escapedDocId = '%252Ffetched-doc.json';
  const docId = '%2Ffetched-doc.json';
  const doc = { hello: 'world' };

  afterEach(nock.cleanAll);

  let store;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
  });

  it('returns undefined for nonexistent document', () => {
    const noDocId = '%2Fno-such-doc.json';
    expect(selectors.documentById(store.getState(), noDocId)).toBeUndefined();
    expect(selectors.jsonById(store.getState(), noDocId)).toBeUndefined();
  });

  it('fetches a doc successfully', done => {
    nock('http://localhost')
      .get('/api/crud/all/' + escapedDocId)
      .reply(200, {
        content: doc
      });
    expect(selectors.isDocumentFetchPending(store.getState(), docId)).toBe(
      false
    );
    const unsubscribe = store.subscribe(() => {
      expect(selectors.isDocumentFetchPending(store.getState(), docId)).toBe(
        true
      );
      unsubscribe();
    });
    store.dispatch(actions.fetchDoc(docId)).then(() => {
      expect(selectors.isDocumentFetchPending(store.getState(), docId)).toBe(
        false
      );
      expect(selectors.documentById(store.getState(), docId)).toEqual(doc);
      expect(selectors.jsonById(store.getState(), docId)).toEqual(doc);
      expect(selectors.contentTypeById(store.getState(), docId)).toEqual(
        'application/json'
      );
      done();
    });
  });

  it('handles failure when fetching a document', done => {
    const failedDocId = '%2Ffailed-doc.json';
    nock('http://localhost')
      .get(/crud/)
      .reply(500);
    store.dispatch(actions.fetchDoc(failedDocId)).then(() => {
      expect(
        selectors.isDocumentFetchPending(store.getState(), failedDocId)
      ).toBe(false);
      // TODO: should 'documentById' return everything and contentById be
      // the content selector?
      expect(
        selectors.documentById(store.getState(), failedDocId)
      ).toBeUndefined();
      expect(selectors.errorById(store.getState(), failedDocId)).toContain(
        'Error'
      );
      done();
    });
  });

  it('handles success after a failure', done => {
    const fickleDocId = '%2Ffickle-doc.json';
    nock('http://localhost')
      .get(/crud/)
      .reply(500);
    store
      .dispatch(actions.fetchDoc(fickleDocId))
      .then(() => {
        nock.cleanAll();
        nock('http://localhost')
          .get(/crud/)
          .reply(200, {
            content: doc
          });
        return store.dispatch(actions.fetchDoc(fickleDocId));
      })
      .then(() => {
        expect(selectors.documentById(store.getState(), fickleDocId)).toEqual(
          doc
        );
        expect(
          selectors.errorById(store.getState(), fickleDocId)
        ).toBeUndefined();
        done();
      });
  });

  it('returns json when XML document is fetched', done => {
    const xml = '<PersonGivenName>Jill</PersonGivenName>';
    nock('http://localhost')
      .get('/api/crud/all/' + escapedDocId)
      .reply(200, xml, { 'Content-Type': 'application/xml' });
    store.dispatch(actions.fetchDoc(docId)).then(() => {
      expect(selectors.documentById(store.getState(), docId)).toEqual(xml);
      expect(selectors.jsonById(store.getState(), docId)).toEqual({
        PersonGivenName: 'Jill'
      });
      done();
    });
  });
});
