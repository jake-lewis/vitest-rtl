import './App.css';
import Counter from './features/counter/Counter';
import PokemonList from './features/pokemon/PokemonList';
import PokemonSearch from './features/pokemon/PokemonSearch';

function App() {

  return (
    <div className="App">
      <PokemonSearch />
      <PokemonList />
      <header className="App-header">
        <Counter/>
      </header>
    </div>
  )
}

export default App
