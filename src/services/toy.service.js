
import Axios from 'axios'
import { httpService } from './http.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    saveReview,
    removeReview
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        const toyId=toy._id
        return httpService.put(BASE_URL + toyId, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function saveReview(txt,toyId){
    return httpService.post(BASE_URL + toyId+'/msg/',{txt})
}

function removeReview(toyId,revId){
    return httpService.delete(BASE_URL + toyId+'/msg/'+ revId)
}


function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock: '',
        labels:[]
    }
}


function getDefaultFilter() {
    return {
        name: '',
        maxPrice: 0,
        inStock: '',
        labels:'',
        sortBy:'',
        sortByDir:false,
       pageIdx:0,
    }
}





