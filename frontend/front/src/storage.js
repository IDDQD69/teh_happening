export function storeLogin(login) {
    localStorage.setItem('login', JSON.stringify(login))
}

export function getLogin() {
    const login = localStorage.getItem('login')

    console.log('login info from storate', login)

    if (login && login !== '') {
        return JSON.parse(login)
    }
    return {}
}

export function clear() {
    localStorage.clear()
}