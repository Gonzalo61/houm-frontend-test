import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { Link } from 'react-router-dom'
import { Loader } from '../ui/Loader';
import { NoSearchPokemon } from '../ui/NoSearchPokemon';
import { SEARCH_API } from '../../config/config';

export const SearchPokemonScreen = () => {

  const [loader, setLoader] = useState(true);
  const params = useParams();
  const [pokemonSearch, setPokemonSearch] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
    
  }, [])

  useEffect( () => {
    setLoader(true)
    fetch(SEARCH_API+(params.pokemonName))
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            throw new Error ('Pokemon no existe')
          }
        }).then(data => {
            if (isMounted.current) {
              const pokemon = [];
              pokemon.push(data)
              setPokemonSearch(pokemon)
              setLoader(false) 
            }
        }).catch((error) => {
          console.log(error)
          setPokemonSearch([]);
          setLoader(false) 
        }); 
  }, [params]);
    
  return (   

    <>

      {
        loader ? (

          <Loader></Loader>

        ) : (
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
                      <NoSearchPokemon pokemonName = {params.pokemonName} />
                      ) : (
                      <div className = "pokemon-container">
                        {
                          pokemonSearch.length > 0 && pokemonSearch.map(pokemon => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                          ))
                        }
                      </div>
                      )
                }
              </>
            </>
        )
      }
    </>
  )

}
               