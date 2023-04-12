import { combineReducers,configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import coinReducer from './coin-reducer';
import { RootState } from './types';
import deckReducer from './deck/deck-reducer';
import { postUserEventData } from '@/pages/api/userevent.api';

const dummyReducer = (state:any={}) => state;

const rootReducer = combineReducers<RootState>({
  coin: coinReducer,
  deck: deckReducer,
  dummy: dummyReducer
});
 

const store = configureStore({
  reducer: rootReducer
});

const subscription = store.subscribe( async () => {
  const state = store.getState();
 
  // Get the current time as a Date object
  const currentTime = new Date(); 
  const fifteenMinutesLater = new Date(currentTime.getTime() + (15 * 60 * 1000)); 
  const ttl = fifteenMinutesLater.getTime();

  const payload = {
    event_id: Date.now(),
    event_data: state,
    event_created_on: ttl
  };

  const response = await postUserEventData(payload);
});

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export default store;