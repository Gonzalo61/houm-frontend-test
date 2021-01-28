import React, {useEffect, useRef, useState} from 'react'
import { GENE_API, SEARCH_API } from '../../config/config'
import { ListaGeneraciones } from '../ListaGeneraciones/ListaGeneraciones';
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { TipoPokemon } from '../tipoPokemon/TipoPokemon';
import { GeneSinCard } from '../ui/GeneSinCard';
import { Loader } from '../ui/Loader';

export const PokemonGeneraciones = () => {
  const [generacion, setGeneracion] = useState('1');
  const [pokemones, setPokemones] = useState([]);
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [loader, setLoader] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }  
  }, [])

  const changeHandleGeneracion = (e) => {
      const value = e.target.value;
      setGeneracion(value)
  }

  const changeHandleType = (e) => {
      const value = e.target.value;
      setTypeFilter(value)
  }
  
  //// PERSISTO EL FILTRO DE BÚSQUEDA
  useEffect(() => {
    if (typeFilter !== '') {
        let newPokemonList = [];
        pokemones.filter( pokemon => {
            if(pokemon === undefined){
                return ''
            }
            return pokemon.types.map( ({type}) => 
                (type.name === typeFilter? newPokemonList.push(pokemon):'')
            )
        })

        setPokemonFilter(newPokemonList)
    } else {
        setPokemonFilter(pokemones)
    }
      
  }, [typeFilter, pokemones])

  useEffect(() => {
    setLoader(true)
    fetch(GENE_API+generacion)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw new Error ('Problemas al mostrar pokémon')
        }
      })
      .then(data => {
        let results = data.pokemon_species;
        let promiesesArray = results.map(result => {
          return fetch(SEARCH_API+result.name)
                      .then(res => {
                          if(res.ok) {
                          return res.json();
                          } 
                      })
        })
        return Promise.all(promiesesArray)
      }).then((data) => {
          if(isMounted.current) {
            setPokemones(data);
            setPokemonFilter(data)
            setLoader(false);
          }
      })   
  }, [generacion])

  return (
      <>
        <div className="container">
          <div className="card w-100">
                <div className="card-body">
                      <h5 className="card-title">Pókemon App</h5>
                    <p className="card-text">En esta sección se filtran los pokémon por generación y tipo</p>
                  <div>
                    <form>
                      <div className="form-row justify-content-between">
                          <div className="form-group col-md-2">
                              <ListaGeneraciones changeHandleGeneracion = {changeHandleGeneracion} />
                          </div>
                          <div className="form-group col-md-2">
                              <TipoPokemon changeHandleType={changeHandleType} />
                          </div>
                      </div>
                    </form>
                  </div>   
                </div>
          </div>
        </div>
          {

        loader === true ? (
            <Loader/>

          ) : (
            <>
              <>
                {
                  pokemonFilter.length !== 0  ? (
                      <div className = "pokemon-container">
                          {
                          pokemonFilter.length > 0 && pokemonFilter.map(pokemon => {
                              if (pokemon === undefined) {
                                  return null
                              }
                              return (
                              <PokemonCard key={pokemon.id} pokemon = {pokemon} />)
                          })
                          }
                      </div>
                  ) : (
                      <GeneSinCard />
                      )
                }
              </>
            </>
          )}
      </>
  )

}
