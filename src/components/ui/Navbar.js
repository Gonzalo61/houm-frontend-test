import React, {useState}  from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'

export const Navbar = () => {

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
                        Houm Test
                    </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavLink activeClassName="active" className="nav-item nav-link" exact to="/all-pokemons">
                            All Pokémon
                        </NavLink>
                        <NavLink activeClassName="active" className="nav-item nav-link" exact to="/generacion-pokemon">
                            Generaciones Pokémon
                        </NavLink>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar por nombre o id" aria-label="Search" value={inputValue} onChange = { handleInputChange } />
                        <button className="btn btn-primary btn-outline-light my-2 my-sm-0" type="submit">Buscar</button>
                    </form>
                </div>
            </nav>
        </>
    )
}
