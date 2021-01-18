const service = {
    create(provider) {
        provider.phoneNumbers = provider.phoneNumbers
            .map(phoneNumber => phoneNumber.replaceAll(" ", "").replaceAll(".", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", ""))
        console.log(provider)
        return fetch('/api/provider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...provider })
        })
    },
    update(provider) {
        provider.phoneNumbers = provider.phoneNumbers
            .map(phoneNumber => phoneNumber.replaceAll(" ", "").replaceAll(".", "").replaceAll("-", "").replaceAll("(", "").replaceAll(")", ""))
        return fetch(`/api/provider/${provider.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...provider })
        })
    },
    getAll(searchTerm) {
        if (searchTerm === null || searchTerm === undefined)
            searchTerm = ''
        let res = fetch(`/api/provider/${searchTerm}`)
            .then(resp => resp.json())
        return res
    },
    delete(id) {
        let res = fetch(`/api/provider/${id}`, {
            method: 'DELETE'
        })
        return res
    }
}

export default service;