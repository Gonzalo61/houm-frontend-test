import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { Link } from 'react-router-dom'

export const SearchPokemonScreen = (prop) => {
    
    const SEARCH_API = "https://pokeapi.co/api/v2/pokemon/";

    
    const params = useParams();

    const [pokemonSearch, setPokemonSearch] = useState([]);


    useEffect( () => {
      
        try {

            fetch(SEARCH_API+(params.pokemonName))
                .then(res => {
                  if(res.ok) {
                    return res.json();
                  } else {
                    throw new Error ('Pokemon no existe')
                  }
                }).then(data => {
                      const pokemon = [];
                      pokemon.push(data)
                      setPokemonSearch(pokemon) 
                }).catch((error) => {
                  console.log(error)
                  setPokemonSearch([]);
                })
                
      
          } catch (error) {
            console.log(error);
          }
    }, [params]);

    return (
      <>
      <div>
        <div className="pagination search">
              <Link to="/all-pokemons">
                <button>Ver Todos</button>
              </Link>
        </div>
      </div>
      
      <>
      {
        pokemonSearch.length === 0? (
          <div className="container">
            <div className="card w-100">
                <div className="card-body">
                  <h4 className="card-title">¡¡Lo Sentimos!!</h4>
                  <p className="card-text">No existe ningún pokémon con el nombre: {params.pokemonName}, porfavor realice otra búsqueda si lo desea.
                    Muchas gracias
                  </p>  
              </div>
            </div>
          </div> 

          ) : (<div className = "pokemon-container">
          {
            pokemonSearch.length > 0 && pokemonSearch.map(pokemon => (
              // <PokemonCard key={pokemon.id} {...pokemon} />
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          }
        </div>
        )}
    </>

    
    </>
        
    )
}
