// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import creator from './creator'; 

const rootReducer = combineReducers({
  creator,
  router
});

export default rootReducer;
