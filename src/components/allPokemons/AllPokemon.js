import React, {useEffect, useState} from 'react';
import { PokemonCard } from '../pokemonCard/PokemonCard';
import { SinCard } from '../ui/SinCard';
import { Pagination } from '../ui/Pagination';
import { Loader } from '../ui/Loader';
import { TYPE_API } from '../../config/config';


const POKE_API = "https://pokeapi.co/api/v2/pokemon/?offset=0&";
// const TYPE_API = "https://pokeapi.co/api/v2/type/";

export const AllPokemon = () => {

    const [loader, setLoader] = useState(true);
    const [limit, setLimit] = useState(10)
    const [prevPage, setPrevPage] = useState("");
    const [nextPage, setNextPage] = useState("");
    const [currenPage, setCurrentPage] = useState(`${POKE_API}limit=${limit}`)
    const [typePokemon, setTypePokemon] = useState("");
    const [pokemones, setPokemones] = useState([]);
    const [pokemonFilter, setPokemonFilter] = useState();
    const [typeGeneral, setTypeGeneral] = useState([]);

    const handleChange = (e) => {
      setLoader('true')
      let limite = e.target.value;
      setLimit(limite);
      setCurrentPage(`${POKE_API}limit=${limite}`)
    }

    const onClickHandleNext = () => {
      let url = nextPage;
      if(url != null) {
        setLoader('true')
        setCurrentPage(url);
      }

    }

    const onClickHandlePrev = () => {
      let url = prevPage;
      if(url != null) {
        setLoader('true')
        setCurrentPage(url);
      }
    }

    const changeHandleType = (e) => {

      const type = (e.target.value).toString();
      
      setTypePokemon(type);
    }

// FILTRA POKÉMON
    useEffect(() => {
      if(typePokemon.length > 0) {          
          let newPokemonList = [];
          pokemones.filter( pokemon => 
            pokemon.types.map( ({type}) => 
               (type.name === typePokemon? newPokemonList.push(pokemon):'')
            )
          )
          
        setPokemonFilter(newPokemonList) 

      } else {
        setPokemonFilter(pokemones); 
      }
      return () => {
      }

    }, [typePokemon, pokemones])

// OBTIENE TODOS LOS POKÉMON
    useEffect( () => {   
      setLoader(true)
      try {
        fetch(currenPage)
                .then(res => {
                  if(res.ok) {
                    return res.json();
                  } else {
                    throw new Error ('Problemas al mostrar pokémon')
                  }
                })
                .then(data => {
                  setNextPage(data.next);
                  setPrevPage(data.previous);
                  let results = data.results;
                  let promiesesArray = results.map(result => {
                    return fetch(result.url)
                              .then(response => response.json());
                  })
                  return Promise.all(promiesesArray)
                }).then((data) => {
                  setPokemonFilter(data);
                  setPokemones(data);
                  setLoader(false);
                })   
        
      } catch (error) {
        console.log(error);
      }   
      return () => {

      }
    }, [limit, currenPage]);


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
                    <p className="card-text">Aplicación realizada en React, consumiendo API de PokeApi.</p>
                    <div>
                      <form>
                        <div className="form-row justify-content-between">
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
                              <div className="form-group col-md-1">
                                <div>
                                  <label htmlFor="inputState">Mostrar: </label>
                                  <select id="inputState" className="form-control" onChange={handleChange} >
                                    <option value="10" defaultValue>10</option>
                                    <option value="20" >20</option>
                                    <option value="30" >30</option>
                                    <option value="50" >50</option>
                                    <option value="100" >100</option>
                                    <option value="151" >151</option>
                                  </select> 
                                </div>
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
                          pokemonFilter.length > 0 && pokemonFilter.map(pokemon => (
                            //<PokemonCard key={pokemon.id} {...pokemon} />
                            <PokemonCard key={pokemon.id} pokemon = {pokemon} />
                          ))
                        }
                      </div>
                    ) : (
                      <div className="container">
                          <SinCard  limit={limit} ></SinCard>
                      </div> 
                  )}
                </>
                  <Pagination onClickHandlePrev={ prevPage ? onClickHandlePrev: null} 
                              onClickHandleNext={ nextPage ? onClickHandleNext: null} />

              </>
            )}
        </>
      )
}