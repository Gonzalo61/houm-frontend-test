import React from 'react'
import pokeball from '../../assets/pokeball.png'

export const Pagination = ({onClickHandlePrev, onClickHandleNext}) => {
    
    return (
        <div className="pagination">
            { onClickHandlePrev && <button onClick={onClickHandlePrev}>Anterior</button>}
              <div className="button-pokeball">
                    <img src={pokeball} alt="pokeball"></img>
                </div>
             { onClickHandleNext && <button onClick={onClickHandleNext}>Siguiente</button>}
        </div>
    )
}
