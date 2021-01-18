import React, {useEffect, useState} from 'react';
import { GENE_API } from '../../config/config';

export const ListaGeneraciones = ({changeHandleGeneracion}) => {

    
    const [generacionList, setGeneracionList] = useState([]);

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



    return (
        <>
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
        </>
    )
}
