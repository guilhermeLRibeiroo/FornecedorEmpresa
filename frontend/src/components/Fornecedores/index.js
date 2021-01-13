import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Fornecedores',
    subtitle: 'Cadastro de Fornecedores'
}

export default class Fornecedores extends Component {
    render(){
        return (
            <Main {...headerProps}>
                Cadastro de Fornecedor
            </Main>
        )
    }
}