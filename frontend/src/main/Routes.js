import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/Home'
import Fornecedores from '../components/Fornecedores'
import Empresas from '../components/Empresas'

const Routes = props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/fornecedores' component={Fornecedores} />
        <Route exact path='/empresas' component={Empresas} />
        <Redirect from='*' to='/' />
    </Switch>

export default Routes;