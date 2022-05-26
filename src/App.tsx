import './App.css';
import Pagination from './features/common/PaginationWrapper';
import Counter from './features/counter/Counter';
import PokemonPaginatedList from './features/pokemon/PokemonPaginatedList';
import PokemonSearch from './features/pokemon/PokemonSearch';
import { useGetPokemonCountQuery } from './services/pokemon';

function App() {
    return (
        <div className='App'>
            <PokemonSearch />
            <PokemonPaginatedList />
            <header className='App-header'>
                <Counter/>
            </header>
        </div>
    );
}

export default App;
