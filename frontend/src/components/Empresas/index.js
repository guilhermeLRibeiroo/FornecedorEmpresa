import React, { Component } from 'react'
import Main from '../template/Main'
import service from '../../services/empresa.service'

const headerProps = {
    icon: 'building',
    title: 'Empresas',
    subtitle: 'Cadastro de Empresas'
}

const initialState = {
    empresa: { name: '', uf: '-1', cnpj: '' },
    list: []
}

const UFs = service.getUFs()

export default class Empresas extends Component {
    state = { ...initialState }

    clear() {
        this.setState({ empresa: { name: '', uf: '-1', cnpj: '' } })
    }

    updateList() {
        service.getAll()
            .then(data => {
                this.setState({ list: data })
            })
    }

    save() {
        service.createOrUpdate(this.state.empresa)
            .then(resp => {
                this.updateList()
            })
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

    renderForm() {
        return (
            <>
                <h3>{this.state.empresa.id ? 'Editar' : 'Cadastrar'}</h3>
                <div className="form">
                    <div className="row">
                        <div className="col-12 col-md-10">
                            <div className="form-group">
                                <label>Nome</label>
                                <input type="text" className="form-control" name="name" value={this.state.empresa.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome"></input>
                            </div>
                        </div>
                        <div className="col-12 col-md-2">
                            <div className="form-group">
                                <label>UF</label>
                                <select className="form-control" name="uf" value={this.state.empresa.uf}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Escolha a UF">
                                    <option value='-1'>Escolha a UF</option>
                                    {(UFs.map(uf => <option value={uf} key={uf} >{uf}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <label>CNPJ</label>
                                <input type="text" className="form-control" name="cnpj" value={this.state.empresa.cnpj}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o cnpj"></input>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderList() {
        return (
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