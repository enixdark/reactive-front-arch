
import { createStore } from 'redux';
import { reducers } from './reducers';

export const store = reducers |> createStore;
