import './App.css';
import Counter from './features/counter/Counter';
import PokemonSearch from './features/pokemon/PokemonSearch';

function App() {

  return (
    <div className="App">
      <PokemonSearch />
      <header className="App-header">
        <Counter/>
      </header>
    </div>
  )
}

export default App
