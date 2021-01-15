import React, {useState}  from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import logo from '../../assets/houm-icono.png'

export const Navbar = ({setPokemones}) => {

    // const SEARCH_API = "https://pokeapi.co/api/v2/pokemon/";

    const [inputValue, setInputValue] = useState('');


    const history = useHistory();


    const handleInputChange = (e) => {

        const busqueda = e.target.value;

        setInputValue((busqueda).toLowerCase());

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if(inputValue.trim().length > 0 ) {

            history.push(`/search/${inputValue}`);
            setInputValue('')
            
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-navbar">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="50" alt="" />
                        Houm Test
                    </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item active">
                        <a className="nav-link" href="#">Pokemones <span className="sr-only">(current)</span></a>
                        </li> */}
                        <NavLink activeClassName="active" className="nav-item nav-link" exact to="/all-pokemons">
                            All Pokémon
                        </NavLink>
                        <NavLink activeClassName="active" className="nav-item nav-link" exact to="/type-pokemon">
                            Típo Pokémon
                        </NavLink>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={inputValue} onChange = { handleInputChange } />
                        
                        {/* <Link to={`./search/${inputValue}`} >    */}
                            <button className="btn btn-back btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                        {/* </Link> */}
                    </form>
                </div>
            </nav>
        </>
    )
}

// import React from 'react'
// import { Link, NavLink } from 'react-router-dom'

// export const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            // <Link 
            //     className="navbar-brand" 
            //     to="/"
            // >
            //     Asociaciones
            // </Link>

//             <div className="navbar-collapse">
//                 <div className="navbar-nav">

                    // <NavLink 
                    //     activeClassName="active"
                    //     className="nav-item nav-link" 
                    //     exact
                    //     to="/marvel"
                    // >
                    //     Marvel
                    // </NavLink>

//                     <NavLink 
//                         activeClassName="active"
//                         className="nav-item nav-link" 
//                         exact
//                         to="/dc"
//                     >
//                         DC
//                     </NavLink>
//                 </div>
//             </div>
//         </nav>
//     )
// }