import React, { Component } from 'react'
import Main from '../template/Main'

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
    fornecedor: { name: '', cpf: '', birthdate: null, rg: '', cnpj: '', companyId: '', pessoaFisica: true },
    list: [],
    validated: false
}

export default class Fornecedores extends Component {
    state = { ...initialState };

    clear() {
        this.setState({ fornecedor: { name: '', cpf: '', birthdate: null, rg: '', cnpj: '', companyId: '', pessoaFisica: true } })
    }

    updateField(event, isBirthdate = false) {
        const fornecedor = { ...this.state.fornecedor }
        if (!isBirthdate)
            fornecedor[event.target.name] = event.target.value
        else
            fornecedor['birthdate'] = event //the component returns the value instead of the event so we need to do this
        this.setState({ fornecedor })
    }

    handleRadio(event) {
        const fornecedor = { ...this.state.fornecedor }
        fornecedor.pessoaFisica = event.currentTarget.id === 'radioPF' ? true : false
        this.setState({ fornecedor })
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({ validated: true });
    };

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
                            <Form.Control.Feedback type="invalid">Preencha o CPF</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="col-4">
                        <Form.Group className="form-group">
                            <label htmlFor="rg">RG</label>
                            <InputMask mask="99.999.999-9" className="form-control" name="rg" id="rg" value={this.state.fornecedor.rg}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o rg" required></InputMask>
                            <Form.Control.Feedback type="invalid">Preencha o RG</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </Form.Row>
                <label>Data de Nascimento</label>
                <Form.Row>
                    <div className="col-6">
                        <Form.Group className="form-group">
                            <DatePicker selected={this.state.fornecedor.birthdate} onChange={e => this.updateField(e, true)} dateFormat='dd/MM/yyyy' maxDate={new Date()}></DatePicker>
                            <Form.Control.Feedback type="invalid">Preencha a Data de Nascimento</Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </Form.Row>
            </>
        )
    }

    renderForm() {
        return (
            <>
                <h3>{this.state.fornecedor.id ? 'Editar' : 'Cadastrar'}</h3>
                <Form>
                    <Form.Row>
                        <div className="col-12 col-md-8">
                            <Form.Group>
                                <label htmlFor="name">Nome</label>
                                <input type="text" className="form-control" name="name" id="name" value={this.state.fornecedor.name}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o nome" required></input>
                                <Form.Control.Feedback type="invalid">Preencha o nome</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                        <div className="mt-5 ml-5">
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="radioPF" name="radioPessoaFisica" className="custom-control-input" onChange={e => this.handleRadio(e)} />
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
                    ) : "PJ"}
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

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}