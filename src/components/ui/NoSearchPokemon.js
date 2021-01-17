import React from 'react'

export const NoSearchPokemon = ({pokemonName}) => {
    return (
        <div className="container">
            <div className="card w-100">
                <div className="card-body">
                  <h4 className="card-title">¡¡Lo Sentimos!!</h4>
                  <p className="card-text">No existe ningún pokémon con el nombre: {pokemonName}, porfavor realice otra búsqueda si lo desea.
                        Muchas gracias
                  </p>  
                </div>
            </div>
        </div> 
    )
}
