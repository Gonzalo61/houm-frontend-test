import React from 'react';


//export const PokemonCard = ({name, weight, height, types, id, stats, sprites}) => {
export const PokemonCard = ({pokemon}) => {

    //const nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1)

    //const imgPokemon = sprites.other.dream_world.front_default;

    //const imgPokemon = sprites.other['official-artwork'].front_default;


    const nameCapitalize = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

    //   let imgPokemon1 = pokemonCard.sprites.other.dream_world.front_default;
  
    const imgPokemon = pokemon.sprites.other['official-artwork'].front_default;


    return (
        <>
        {/* <div className="pokemon">
            <div className="pokemon-img"> 
                <img className="art" src={imgPokemon} alt="{name}"/>
            </div>
            <div className="pokemon-info">
                <div className="container-nro">
                    <div className="pokemon-nro">
                        <h2>#{id}</h2>
                    </div>
                </div>
                <div className="pokemon-name">
                    <h2>{nameCapitalize}</h2>
                </div>
                <hr></hr>
                <div key={name} className="hp-data">
                { 

                    stats.filter( stat => 
                        stat.stat.name === 'hp'
                    ).map(stat => {
                        console.log(stat.base_stat+'_'+name);
                        return (
                            <>
                            <span key={stat.base_stat+name} className="hp">HP: {stat.base_stat}</span>
                            </>
                        )
                    })
                }
                </div>
                <div className="pokemon-data">
                    <div>
                        <div className="info-center">
                            <span>{weight}kg</span>
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Peso</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-center">
                            <span>{height}m</span>
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Altura</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-center">
                            

                                {types.map( (type) => {
                                    let icono = type.type.name;
                                    return (
                                        <div key={'hp_'+name} className="pokemon-type">
                                            <img className="icon-type" src={require(`../../assets/types/${icono}.png`).default} alt=""/>
                                        </div>
                                    )
                                    
                                })}
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Tipo</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div> */}
        
        <div className="pokemon">
            <div className="pokemon-img"> 
                <img className="art" src={imgPokemon} alt="{name}"/>
            </div>
            <div className="pokemon-info">
                <div className="container-nro">
                    <div className="pokemon-nro">
                        <h2>#{pokemon.id}</h2>
                    </div>
                </div>
                <div className="pokemon-name">
                    <h2>{nameCapitalize}</h2>
                </div>
                <hr></hr>
                <div className="hp-data">
                { 

                    pokemon.stats.filter( stat => 
                        stat.stat.name === 'hp'
                    ).map(stat => {
                        return (
                            
                            <span key={'hp'+pokemon.name} className="hp">HP: {stat.base_stat}</span>
                            
                        )
                    })
                }
                </div>
                <div className="pokemon-data">
                    <div>
                        <div className="info-center">
                            <span>{pokemon.weight}kg</span>
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Peso</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-center">
                            <span>{pokemon.height}m</span>
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Altura</span>
                        </div>
                    </div>
                    <div>
                        <div className="info-center">
                            

                                {pokemon.types.map( (type) => {
                                    let icono = type.type.name;
                                    return (
                                        <div key={type.type.name+'_'+icono} className="pokemon-type">
                                            <img className="icon-type" src={require(`../../assets/types/${icono}.png`).default} alt=""/>
                                        </div>
                                    )
                                    
                                })}
                        </div>
                        <div className="info-center">
                            <span className="datos-name">Tipo</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    );
}
