import React, {useEffect, useState} from 'react';
import { TYPE_API } from '../../config/config';

export const TipoPokemon = ({changeHandleType}) => {
    
    const [typeGeneral, setTypeGeneral] = useState([]);

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
        </>
    )
}
