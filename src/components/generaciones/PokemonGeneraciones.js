import React, {useEffect, useState} from 'react'
import { GENE_API, SEARCH_API, TYPE_API } from '../../config/config'
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { Loader } from '../ui/Loader';

export const PokemonGeneraciones = () => {

    const [generacion, setGeneracion] = useState('1');
    const [generacionList, setGeneracionList] = useState([]);
    const [pokemones, setPokemones] = useState([]);
    const [pokemonFilter, setPokemonFilter] = useState([]);
    const [loader, setLoader] = useState(true);
    const [typeGeneral, setTypeGeneral] = useState([]);
    const [typeFilter, setTypeFilter] = useState('');

    const changeHandleGeneracion = (e) => {
        const value = e.target.value;
        setGeneracion(value)
    }

    const changeHandleType = (e) => {
        const value = e.target.value;
        setTypeFilter(value)
    }

    //////////////// GUARDO LA LISTA DE GENERACIONES /////////////////////////
    useEffect(() => {
        try {
            fetch(GENE_API)
                    .then(res => {
                      if(res.ok) {
                        return res.json();
                      } else {
                        throw new Error ('Problemas al mostrar pokémon')
                      }
                    })
                    .then(data => {
                      let results = data.results;
                      let promiesesArray = results.map(result => {
                        return fetch(result.url)
                                  .then(response => response.json());
                      })
                      return Promise.all(promiesesArray)
                    }).then((data) => {
                        setGeneracionList(data)
                    })   
          } catch (error) {
            console.log(error);
          }   
        
    }, [])

    
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
      try {
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
                                    } else {
                                        console.log();
                                    }
                                })
                  })
                  return Promise.all(promiesesArray)
                }).then((data) => {
                    setPokemones(data);
                    setPokemonFilter(data)
                    setLoader(false);
                })   
      } catch (error) {
        console.log(error);
      }   

    }, [generacion])

    // OBTIENE TODOS LOS TIPOS DE POKÉMON
    useEffect( () => {
        try {
          fetch(TYPE_API)
                  .then(res => res.json())
                  .then(data => {
                    let results = data.results;
                    setTypeGeneral(results);
                  })
        } catch (error) {
          console.log(error);
        }
        return () => {
  
        }
      }, []);


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
                                <label htmlFor="inputState">Generación</label>
                                <select onChange={changeHandleGeneracion} id="inputState" className="form-control">
                                    {generacionList.map( (gene) => {  
                                            let nameCapitalize = gene.main_region.name.charAt(0).toUpperCase() + gene.main_region.name.slice(1)
                                            return (            
                                                <option value={gene.id} key={gene.id}>
                                                    {nameCapitalize}
                                                </option>        
                                            )
                                        })}
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputState">Tipo</label>
                                <select onChange={changeHandleType} id="inputState" className="form-control">
                                    <option value="" defaultValue>Todos</option>
                                    {typeGeneral.map( (type) => {  
                                            let nameCapitalize = type.name.charAt(0).toUpperCase() + type.name.slice(1)
                                            return (            
                                                <option value={type.name} key={type.name}>
                                                    {nameCapitalize}
                                                </option>        
                                            )
                                        })}
                                </select>
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
                        <div className="container">
                            <div className="card w-100">
                                <div className="card-body">
                                    <h4 className="card-title">¡¡Lo Sentimos!!</h4>
                                    <p className="card-text">No existe ningún pokémon que coincida con su filtro de búsqueda. 
                                    </p>  
                                </div>
                            </div>
                        </div> 
                  )}
                </>
              </>
            )}
        </>
    )
}
