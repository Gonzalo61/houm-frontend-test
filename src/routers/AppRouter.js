import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { AllPokemon } from '../components/allPokemons/AllPokemon';
import { PokemonGeneraciones } from '../components/generaciones/PokemonGeneraciones';
import { SearchPokemonScreen } from '../components/searchPokemon/SearchPokemonScreen';
import { Navbar } from '../components/ui/Navbar';

export const AppRouter = () => {
    return (
        <Router>
      <div>
        <Navbar/>
        <Switch>

            <Route exact path="/all-pokemons" component={AllPokemon} />

            <Route exact path="/search/:pokemonName" component={SearchPokemonScreen} />

            <Route exact path="/generacion-pokemon" component={PokemonGeneraciones} />

            <Redirect to="/all-pokemons"/>

        </Switch>
      </div>
    </Router>
    )
}
