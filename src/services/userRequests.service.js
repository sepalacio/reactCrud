import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/users'

const getUsers = () => axios.get(baseUrl)

const addUser = user => axios.post(baseUrl, user)

const updateUser = (userId, formFields) => axios.put(`${baseUrl}/${userId}`, formFields)

export default {
    getUsers,
    addUser,
    updateUser
}