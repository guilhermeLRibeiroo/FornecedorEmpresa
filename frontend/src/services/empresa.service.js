//import http from '../plugins/http'

const service = {
    getUFs() {
        return ['RO',
            'AC',
            'AM',
            'RR',
            'PA',
            'AP',
            'TO',
            'MA',
            'PI',
            'CE',
            'RN',
            'PB',
            'PE',
            'AL',
            'SE',
            'BA',
            'MG',
            'ES',
            'RJ',
            'SP',
            'PR',
            'SC',
            'RS',
            'MS',
            'MT',
            'GO',
            'DF']
    },
    createOrUpdate(empresa) {
        const method = empresa.id ? 'put' : 'post'
        const url = empresa.id ? `/api/company/${empresa.id}` : '/api/company'
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empresa)
        })
    },
    getAll() {
        let res = fetch('/api/company')
            .then(resp => resp.json())
        return res
    },
    delete(id) {
        let res = fetch(`/api/company/${id}`, {
            method: 'delete'
        })
        return res
    }
}

export default service;