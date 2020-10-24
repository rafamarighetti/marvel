import React from 'react'

import LOGO from '../assets/img/logo.svg'
import './styles.scss'
 
const Header = () => {
    return (
        <header>
            <div className="container">
                <img src={LOGO} alt="Marvel"/>  
            </div>	 
        </header>  
    )
}

export default Header;