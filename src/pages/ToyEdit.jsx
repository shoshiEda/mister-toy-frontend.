// const { useState, useEffect, useRef } = React

import { useEffect, useState } from "react"
import { saveToy } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'



import { toyService } from "../services/toy.service.js"
import { useNavigate, useParams,Link } from "react-router-dom"


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) {
            loadToy()
        }
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(setToyToEdit)
            .catch(err=>console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(()=> showSuccessMsg(`Toy added: ${toyToEdit.name}`))
            .then(() => navigate('/toy'))
            .catch(err => console.log('err:', err))
    }

   

    return (
        <section className="toy-editor full main-layout">
            
            <h1>Toy's details</h1>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

<div>
                <label htmlFor="inStock">in stock:</label>
                <input onChange={handleChange} type="checkbox" id="inStock" name="inStock" />
                </div>
                <button>Save</button>
                <button><Link to="/toy">Back</Link></button>

   
            </form>
           
        </section>
    )
}