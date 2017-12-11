import { combineReducers } from 'redux';
import search from 'ml-search-redux';
import documents from 'ml-documents-redux';

export default combineReducers({search, documents});
