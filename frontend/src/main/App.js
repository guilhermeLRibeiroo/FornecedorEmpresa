import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

import React from 'react'
import { HashRouter } from 'react-router-dom'

import Nav from '../components/template/Nav'
import Routes from './Routes'
import Footer from '../components/template/Footer'

export default function App(props) {
    return <>
        <HashRouter>
            <div className="app">
                <Nav />
                <Routes />
                <Footer />
            </div>
        </HashRouter>
    </>
}