import styled from '@emotion/styled';
import React, { useState } from 'react';
import PokemonTile from './PokemonTile';

export interface Props {
    defaultPokemon?: string;
}

const Container = styled.div({
    backgroundColor: '#5f6572',
    padding: '30px',
});

const PokemonSearch = ({ defaultPokemon = 'bulbasaur' }: Props) => {
    const [inputText, setInputText] = useState(defaultPokemon);
    const [pokemonName, setPokemonName] = useState(inputText);

    const handleSubmit = () => setPokemonName(inputText || '');

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <Container>
            <input placeholder={pokemonName} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleEnter} />
            <button onClick={handleSubmit}>Search</button>
            <PokemonTile name={pokemonName}/>
        </Container>
    );
};

export default PokemonSearch;
