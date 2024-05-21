import http from './http'

export async function login(username: string, password: string) {
    return http.post('/auth/signin', {
        username,
        password
    })

    
}