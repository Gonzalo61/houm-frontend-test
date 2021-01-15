import React, {useEffect, useState} from 'react';
import { PokemonCard } from '../pokemonCard/PokemonCard';

export const TipoPokemon = () => {

    
    const POKE_API = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=371";
    const [pokemonesFilter, setPokemonesFilter] = useState([]);
    const [pokemones, setPokemones] = useState([]);


    const changeHandleType = (e) => {

        let typePoke = e.target.value;
        if(typePoke.length > 0) {
            let newPokemonList = [];
          pokemones.filter( pokemon => 
            pokemon.types.map( ({type}) => 
               (type.name === typePoke? newPokemonList.push(pokemon):'')
            )
          )
            setPokemonesFilter(newPokemonList)
            
        } else {
            setPokemonesFilter(pokemones);
        }
        
      }
  
      useEffect( () => {
        try {
        
            getTypePokemon();
            
          
        } catch (error) {
          console.log(error);
        }
    
      }, []);

      const getTypePokemon = () => {
        fetch(POKE_API)
            .then(res => res.json())
            .then(data => {
                let results = data.results;
                let promiesesArray = results.map(result => {
                return fetch(result.url)
                            .then(response => response.json());
                })
                return Promise.all(promiesesArray)
            }).then((data) => {
                setPokemones(data)
                setPokemonesFilter(data)
            })


      }
  
  

    return (
        <>
        
        <div className="container">
          <div className="card w-100">
                <div className="card-body">
                  <h5 className="card-title">Pókemon App</h5>
                  <p className="card-text">Aplicación realizada en React, consumiendo API de PokeApi y Api para las imagenes.</p>
                  <div>
                    <form>
                      <div className="form-row justify-content-around">
                          <div className="form-group col-md-2">
                            <label htmlFor="inputState">Tipo</label>
                            <select onChange={changeHandleType} id="inputState" className="form-control">
                              <option value="" defaultValue>Todos</option>
                              <option value="water">Agua</option>
                              <option value="fire">Fuego</option>
                              <option value="poison">Veneno</option>
                              <option value="bug">Bicho</option>
                              <option value="electric">Electrico</option>
                            </select>
                          </div>
                        </div>
                    </form>
                  </div>

                </div>
          </div>
        </div> 

        
        <div className = "pokemon-container">
          {
            pokemonesFilter.length > 0 && pokemonesFilter.map(pokemon => (
              // <PokemonCard key={pokemon.id} {...pokemon} />
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </div>
        </>
    )
}
