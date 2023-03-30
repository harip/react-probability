import { combineReducers,configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import coinReducer from './coin-reducer';
import { RootState } from './types';

const dummyReducer = (state:any={}) => state;

const rootReducer = combineReducers<RootState>({
  coin: coinReducer,
  dummy: dummyReducer
});
 

const store = configureStore({
  reducer: rootReducer
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;