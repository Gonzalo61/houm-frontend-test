import React from 'react'

export const LimitePokemon = ({handleChange}) => {
    return (
        <>
            <label htmlFor="inputState">Mostrar: </label>
            <select id="inputState" className="form-control" onChange={handleChange} >
                <option value="10" defaultValue>10</option>
                <option value="20" >20</option>
                <option value="30" >30</option>
                <option value="50" >50</option>
                <option value="100" >100</option>
                <option value="151" >151</option>
            </select> 

        </>
    )
}
