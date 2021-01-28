import React, {useEffect, useRef, useState} from 'react';
import { TYPE_API } from '../../config/config';

export const TipoPokemon = ({changeHandleType}) => {
    
    const [typeGeneral, setTypeGeneral] = useState([]);

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
          isMounted.current = false;
        }
      }, [])


    // OBTIENE TODOS LOS TIPOS DE POKÉMON
    useEffect( () => {
        fetch(TYPE_API)
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(data => {
                if(isMounted.current) {
                    let results = data.results;
                    setTypeGeneral(results);
                }
            })
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
