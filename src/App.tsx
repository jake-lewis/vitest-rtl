import './App.css';
import Pagination from './features/common/PaginationWrapper';
import Counter from './features/counter/Counter';
import PokemonList from './features/pokemon/PokemonList';
import PokemonSearch from './features/pokemon/PokemonSearch';
import { useGetPokemonCountQuery } from './services/pokemon';

function App() {
    const { data: pokemonCount } = useGetPokemonCountQuery();
    return (
        <div className='App'>
            <PokemonSearch />
            <Pagination count={pokemonCount}>
                <PokemonList />
            </Pagination>
            <header className='App-header'>
                <Counter/>
            </header>
        </div>
    );
}

export default App;
