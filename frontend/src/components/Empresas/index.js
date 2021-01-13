import React, { Component } from 'react'
import Main from '../template/Main'
import service from '../../services/empresa.service'

import CpfCnpj from '@react-br-forms/cpf-cnpj-mask'

import { Form } from 'react-bootstrap'

const headerProps = {
    icon: 'building',
    title: 'Empresas',
    subtitle: 'Cadastro de Empresas'
}

const initialState = {
    empresa: { name: '', uf: '-1', cnpj: '' },
    list: [],
    validated: false
}

const UFs = service.getUFs()

export default class Empresas extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ empresa: { name: '', uf: '', cnpj: '' } })
    }

    updateList() {
        service.getAll()
            .then(data => {
                this.setState({ list: data })
            })
    }

    save() {
        if (this.state.empresa.id) {
            service.update(this.state.empresa)
                .then(resp => {
                    this.updateList()
                    if(this.state.validated)
                        this.clear()
                })
        } else {
            service.create(this.state.empresa)
                .then(resp => {
                    this.updateList()
                    if(this.state.validated)
                        this.clear()
                })
        }
    }

    edit(empresa) {
        this.setState({ empresa: { ...empresa } })
    }

    delete(id) {
        service.delete(id)
            .then(resp => {
                this.updateList()
            })
    }

    componentDidMount() {
        this.updateList();
    }

    updateField(event) {
        const empresa = { ...this.state.empresa }
        empresa[event.target.name] = event.target.value
        this.setState({ empresa })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });
    };

    renderForm() {
        return (
            <>
                <h3>{this.state.empresa.id ? 'Editar' : 'Cadastrar'}</h3>
                <Form validated={this.state.validated} onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <div className="col-12 col-md-10">
                            <Form.Group>
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" name="name" id="name" value={this.state.empresa.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome" required></input>
                                <Form.Control.Feedback type="invalid">Preencha o nome</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-12 col-md-2">
                            <Form.Group>
                                <label htmlFor="uf">UF</label>
                                <select className="form-control" name="uf" id="uf" value={this.state.empresa.uf}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Escolha a UF"
                                    required>
                                    <option value=''>Escolha a UF</option>
                                    {(UFs.map(uf => <option value={uf} key={uf} >{uf}</option>))}
                                </select>
                                <Form.Control.Feedback type="invalid">Escolha a UF</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="col-12">
                            <Form.Group className="form-group">
                                <label htmlFor="cnpj">CNPJ</label>
                                <CpfCnpj type="text" className="form-control" name="cnpj" id="cnpj" value={this.state.empresa.cnpj}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o cnpj" required></CpfCnpj>
                                <Form.Control.Feedback type="invalid">Preencha o CNPJ</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </Form.Row>

                    <hr />
                    <Form.Row>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={e => this.save(e)} type="submit">Salvar</button>
                            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                        </div>
                    </Form.Row>
                </Form>
            </>
        )
    }

    renderList() {
        return (
            <>
                <h3>Empresas</h3>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>CNPJ</th>
                            <th>UF</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.list.map((empresa, index) =>
                        <tr key={index}>
                            <td>{empresa.name}</td>
                            <td>{empresa.cnpj}</td>
                            <td>{empresa.uf}</td>
                            <td>
                                <button className="btn btn-primary" onClick={e => this.edit(empresa)}>Editar</button>
                                <button className="btn btn-secondary ml-2" onClick={e => this.delete(empresa.id)}>Excluir</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderList()}
            </Main>
        )
    }
}