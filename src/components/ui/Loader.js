import React from 'react'
import pokeball from '../../assets/pokeball.png'

export const Loader = () => {
    return (
        <div className="loader">
            <img src={pokeball} alt="poke"/>
        </div>
    )
}
