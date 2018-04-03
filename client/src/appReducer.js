import { combineReducers } from 'redux';
import search from 'ml-search-redux';
import documents from 'ml-documents-redux';
import user from './muir-user-redux';

export default combineReducers({search, documents, user});
