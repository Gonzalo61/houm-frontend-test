import React from 'react'

export const SinCard = ({limit}) => {
    return (
        <div className="card w-100">
            <div className="card-body">
                <h4 className="card-title">¡¡Lo Sentimos!!</h4>
                <p className="card-text">En esta lista de {limit} cards, no existe un pokémon que corresponda al filtro de su búsqueda.
                              Por favor aumente el limite de tarjetas a mostrar o siga cambiando de página. Muchas Gracias!
                </p>  
            </div>
        </div>
    )
}
