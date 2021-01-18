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
    create(empresa){
        return fetch('/api/company', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empresa)
        })
    },
    update(empresa) {
        return fetch(`/api/company/${empresa.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'name': empresa.name, 'cnpj': empresa.cnpj, 'uf': empresa.uf})
        })
    },
    getAll() {
        let res = fetch('/api/company')
            .then(resp => resp.json())
        return res
    },
    delete(id) {
        let res = fetch(`/api/company/${id}`, {
            method: 'DELETE'
        })
        return res
    }
}

export default service;