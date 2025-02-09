import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import logger from 'redux-logger';
import AuthSlice from './auth/authSlice';
import CreateAccountSlice from './auth/registerSlice';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  
  const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, AuthSlice),
    register: CreateAccountSlice,
  });
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
  });
const persistor = persistStore(store);
export { store, persistor, Provider, PersistGate };