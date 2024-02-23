import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

function getById(userId) {
    return httpService.get(BASE_URL + userId)
}

async function login({ username, password }) {
    try{
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
        else return Promise.reject('Invalid login')
    }
    catch(err){
        console.log('err:',err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    try{
        const newUser = await httpService.post(BASE_URL + 'signup', user)
         _setLoggedinUser(newUser)
         return newUser
    }
    catch(err){
        console.log('err:',err)
        throw err
    }
   }



async function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    try{
        const user = await httpService.put('user/', { diff })
        _setLoggedinUser(user)
        return user.score
    }
    catch(err){
        console.log('err:',err)
        throw err
    }
}

async function logout() {
    try{
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    }
    catch(err){
        console.log('err:',err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



