import axios from 'axios'

export default() => {
    return axios.create({
        baseURL:  'https://statsapi.web.nhl.com/api/v1/',
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}