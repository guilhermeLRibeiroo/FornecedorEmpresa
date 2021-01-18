import React, { Component } from 'react'
import Main from '../template/Main'
import FornecedorService from '../../services/fornecedor.service'
import EmpresaService from '../../services/empresa.service'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import InputMask from 'react-input-mask'

import { Form } from 'react-bootstrap'

const headerProps = {
    icon: 'users',
    title: 'Fornecedores',
    subtitle: 'Cadastro de Fornecedores'
}

const initialState = {
    fornecedor: { name: '', cpf: '', birthdate: '', rg: '', cnpj: '', companyId: '', pessoaFisica: true, phoneNumbers: [''] },
    empresaSelected: { UF: '' },
    listEmpresas: [],
    listFornecedores: [],
    validated: false,
    searchTerm: ""
}

export default class Fornecedores extends Component {
    state = { ...initialState };

    clear() {
        this.setState({
            fornecedor: { name: '', cpf: '', birthdate: '', rg: '', cnpj: '', companyId: '', phoneNumbers: [''] },
            empresaSelected: { UF: '' }
        })
    }

    updateField(event, isBirthdate = false) {
        const fornecedor = { ...this.state.fornecedor }
        const empresaSelected = { ...this.state.empresaSelected }
        if (!isBirthdate)
            fornecedor[event.target.name] = event.target.value
        else
            fornecedor['birthdate'] = event

        const empresas = this.state.listEmpresas
        const empresa = empresas.find(empresa => empresa.id === event.target.value)
        if (!fornecedor.pessoaFisica) {
            if (event.target.name === 'companyId') {
                fornecedor.cnpj = empresa.cnpj
                empresaSelected.UF = ''
            }
        } else {
            fornecedor.cnpj = '';
            empresaSelected.UF = empresa.uf
        }
        this.setState({ fornecedor, empresaSelected })
    }

    save() {
        if (this.state.fornecedor.id) {
            FornecedorService.update(this.state.fornecedor)
                .then(resp => {
                    this.updateList(this.state.searchTerm)
                    if (this.state.validated)
                        this.clear()
                })
        } else {
            FornecedorService.create(this.state.fornecedor)
                .then(resp => {
                    this.updateList(this.state.searchTerm)
                    if (this.state.validated)
                        this.clear()
                })
        }
    }

    handleRadio(event) {
        const fornecedor = { ...this.state.fornecedor }
        fornecedor.pessoaFisica = event.currentTarget.id === 'radioPF' ? true : false
        this.setState({ fornecedor })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        this.setState({ validated: true });
    };

    componentDidMount() {
        EmpresaService.getAll()
            .then(data => {
                this.setState({ listEmpresas: data })
            })
        this.updateList(this.state.searchTerm)
    }

    addPhoneNumber(event) {
        const fornecedor = this.state.fornecedor
        fornecedor.phoneNumbers.push("")
        this.setState({ fornecedor })
    }

    updatePhoneNumber(event, index) {
        const fornecedor = this.state.fornecedor
        fornecedor.phoneNumbers[index] = event.target.value
        this.setState({ fornecedor })
    }

    handleRemovePhoneNumber(index) {
        const fornecedor = this.state.fornecedor
        fornecedor.phoneNumbers.splice(index, 1)
        this.setState({ fornecedor })
    }

    updateList(searchTerm) {
        FornecedorService.getAll(searchTerm)
            .then(data => {
                this.setState({ listFornecedores: data })
            })
    }

    delete(id) {
        FornecedorService.delete(id)
            .then(resp => {
                this.updateList(this.state.searchTerm)
            })
    }

    handleSearchTermChange(event) {
        const searchTerm = event.target.value
        this.setState({ searchTerm })
        this.updateList(event.target.value)
    }

    renderFormPJ() {
        return (
            <>
                <Form.Row>
                    <div className="col-4">
                        <label>Números de Telefone</label>
                        {
                            this.state.fornecedor.phoneNumbers.map((phoneNumber, index) => {
                                return (
                                    <div key={index}>
                                        <InputMask mask="(99) 99999-9999" className="form-control" value={phoneNumber} onChange={e => this.updatePhoneNumber(e, index)} />
                                        <div className=" d-flex justify-content-end mt-1">
                                            <button className="btn btn-secondary" onClick={e => this.handleRemovePhoneNumber(index)} type="button">Remove</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-2" style={{ 'marginTop': '32px' }}>
                        <button className="btn btn-primary" onClick={e => this.addPhoneNumber(e)} type="button">Adicionar Número</button>
                    </div>
                    <div className="col-6">
                        <Form.Group className="form-group">
                            <label htmlFor="companyId">Empresa</label>
                            <select className="form-control" name="companyId" id="empresa" value={this.state.fornecedor.companyId}
                                onChange={e => this.updateField(e)}
                                placeholder="Escolha a Empresa"
                                required>
                                <option value=''>Escolha a Empresa</option>
                                {(this.state.listEmpresas.map(empresa => <option value={empresa.id} key={empresa.id} >{empresa.name}</option>))}
                            </select>
                        </Form.Group>
                    </div>
                </Form.Row>
            </>
        )
    }

    renderFormPF() {
        return (
            <>
                <Form.Row>
                    <div className="col-4">
                        <Form.Group className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <InputMask mask="999.999.999-99" className="form-control" name="cpf" id="cpf" value={this.state.fornecedor.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o cpf" required></InputMask>
                        </Form.Group>
                    </div>
                    <div className="col-4">
                        <Form.Group className="form-group">
                            <label htmlFor="rg">RG</label>
                            <InputMask mask="99.999.999-9" className="form-control" name="rg" id="rg" value={this.state.fornecedor.rg}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o rg" required></InputMask>
                        </Form.Group>
                    </div>
                    <div className="col-4">
                        <Form.Group className="form-group">
                            <label htmlFor="companyId">Empresa</label>
                            <select className="form-control" name="companyId" id="empresa" value={this.state.fornecedor.companyId}
                                onChange={e => this.updateField(e)}
                                placeholder="Escolha a Empresa"
                                required>
                                <option value=''>Escolha a Empresa</option>
                                {(this.state.listEmpresas.map(empresa => <option value={empresa.id} key={empresa.id} >{empresa.name}</option>))}
                            </select>
                        </Form.Group>
                    </div>
                </Form.Row>
                <Form.Row>
                    <div className="col-4">
                        <label>Data de Nascimento</label>
                        <Form.Group className="form-group">
                            <DatePicker className="form-control" selected={this.state.fornecedor.birthdate} onChange={e => this.updateField(e, true)} dateFormat='dd/MM/yyyy' maxDate={new Date()} required></DatePicker>
                            {this.state.empresaSelected.UF === 'PR' ? <div style={{ "fontSize": "10px", "color": "red" }}>*Precisa ser maior de 18 anos</div> : ""}
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <label>Números de Telefone</label>
                        {
                            this.state.fornecedor.phoneNumbers.map((phoneNumber, index) => {
                                return (
                                    <div key={index}>
                                        <InputMask mask="(99) 99999-9999" className="form-control" value={phoneNumber} onChange={e => this.updatePhoneNumber(e, index)} />
                                        <div className=" d-flex justify-content-end mt-1">
                                            <button className="btn btn-secondary" onClick={e => this.handleRemovePhoneNumber(index)} type="button">Remove</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-2" style={{ 'marginTop': '32px' }}>
                        <button className="btn btn-primary" onClick={e => this.addPhoneNumber(e)} type="button">Adicionar Número</button>
                    </div>
                </Form.Row>
            </>
        )
    }

    renderForm() {
        return (
            <>
                <h3>{this.state.fornecedor.id ? 'Editar' : 'Cadastrar'}</h3>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <Form.Row>
                        <div className="col-12 col-md-8">
                            <Form.Group>
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" name="name" id="name" value={this.state.fornecedor.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome" required></input>
                            </Form.Group>
                        </div>
                        <div className="mt-5 ml-5">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="radioPF" name="radioPessoaFisica" className="custom-control-input" onChange={e => this.handleRadio(e)} defaultChecked />
                                <label className="custom-control-label" htmlFor="radioPF">Pessoa Física</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="radioPJ" name="radioPessoaFisica" className="custom-control-input" onChange={e => this.handleRadio(e)} />
                                <label className="custom-control-label" htmlFor="radioPJ">Pessoa Jurídica</label>
                            </div>
                        </div>
                    </Form.Row>
                    {this.state.fornecedor.pessoaFisica ? (
                        this.renderFormPF()
                    ) :
                        this.renderFormPJ()}
                    <hr />
                    <Form.Row>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={e => this.save(e)} type="submit">Salvar</button>
                            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)} type="reset">Cancelar</button>
                        </div>
                    </Form.Row>
                </Form>
            </>)
    }

    renderList() {
        return (
            <>
                <h3>Fornecedores</h3>
                <input className="form-control" value={this.state.searchTerm} onChange={e => this.handleSearchTermChange(e)} placeholder="Pesquisa..." />
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Fornecedor</th>
                            <th>CNPJ</th>
                            <th>CPF</th>
                            <th>RG</th>
                            <th>Números de Telefone</th>
                            <th colSpan="2" style={{ "width": "20%" }}>Ação</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.listFornecedores.map((fornecedor, index) =>
                        <tr key={index}>
                            <td>{fornecedor.name}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.cpf}</td>
                            <td>{fornecedor.rg}</td>
                            <td>{fornecedor.phoneNumbers.join(', ')}</td>
                            <td>
                                <button className="btn btn-primary" onClick={e => this.edit(fornecedor)}>Editar</button>
                                <button className="btn btn-secondary ml-2" onClick={e => this.delete(fornecedor.id)}>Excluir</button>
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