import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface PaginationState {
    page: number;
    pageSize: number;
}

const initialState: PaginationState = {
    page: 1,
    pageSize: 20,
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        nextPage: (state) => {
            state.page += 1;
        },
        previousPage: (state) => {
            state.page -= 1;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        goToFirstPage: (state) => {
            state.page = 1;
        },
        goToLastPage: (state, action: PayloadAction<number>) => {
            state.page = Math.ceil(action.payload / state.pageSize);
        },
    },
});

export const {
    nextPage, previousPage, setPage, goToFirstPage, goToLastPage,
} = pokemonSlice.actions;

export const selectPage = (state: RootState) => state.pokemon.page;
export const selectPageSize = (state: RootState) => state.pokemon.pageSize;

export default pokemonSlice.reducer;
