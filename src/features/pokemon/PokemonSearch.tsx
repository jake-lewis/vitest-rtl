import { useState } from "react";
import { useGetPokemonByNameQuery } from "../../services/pokemon";

const PokemonSearch = () => {

    const [inputText, setInputText] = useState('bulbasaur')
    const [pokemonName, setPokemonName] = useState(inputText);
    const { data, error, isFetching, isLoading } = useGetPokemonByNameQuery(pokemonName);

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    const handleSubmit = () => setPokemonName(inputText || '');

    return (
        <div>
            {error ? (
                <>
                    <p aria-label={'error message'}>Oh no, there was an error</p>
                    <input placeholder={pokemonName} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleEnter} />
                    <button onClick={handleSubmit}>Search</button>
                </>
            ) : isFetching || isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <input placeholder={pokemonName} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleEnter} />
                    <button onClick={handleSubmit}>Search</button>
                    <img src={data.sprites.front_shiny || undefined} alt={data.species.name} />
                </>
            ) : null}
        </div>
    )
};

export default PokemonSearch;