import React from 'react'
import Main from '../template/Main'

export default function Home(props) {
    return <Main icon="home" title="Início" subtitle="Aplicação web de Empresa e Fornecedores">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para cadastrar fornecedores e empresas em React.</p>
    </Main>
}