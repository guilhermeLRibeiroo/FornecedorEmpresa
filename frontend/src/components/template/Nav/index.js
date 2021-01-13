import './index.css'
import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav(props){
    return <>
        <aside className="menu-area">
            <nav className="menu">
                <Link to="/">
                    <i className="fa fa-home"></i> Início
                </Link>
                <Link to="/fornecedores">
                    <i className="fa fa-users"></i> Fornecedores
                </Link>
                <Link to="/empresas">
                    <i className="fa fa-building"></i> Empresas
                </Link>
            </nav>
        </aside>
    </>
}