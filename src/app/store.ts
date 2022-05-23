import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import { pokemonApi } from '../services/pokemon';

const rootReducer = combineReducers({
    counter: counterReducer,
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
