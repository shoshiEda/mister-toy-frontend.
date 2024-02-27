// const { useState, useEffect, useRef } = React

import { useEffect, useState } from "react"
import { saveToy } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { useFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { LabelCheckbox } from '../cmps/LabelCheckbox.jsx'
import { toyService } from "../services/toy.service.js"
import { useNavigate, useParams,Link } from "react-router-dom"
import { ImgUploader } from './ImgUploader.jsx'


const EditingSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('We need the toy name'),
    price: Yup.number().positive().required('The price should be a positive number'),
})


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [toyLabels, setToyLabels] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const labels  = useSelector(storeState => storeState.toyModule.labels)


    const {values, handleBlur,handleSubmit,handleChange,setValues,errors} = useFormik({
        initialValues:toyToEdit,
        validationSchema:EditingSchema,
        onSubmit:{onSaveToy}
    })

    useEffect(() => {
        if (params.toyId) {
            loadToy()
        }
    }, [])

    useEffect(() => {
        setValues(toyToEdit);
        setToyLabels(toyToEdit.labels)

    }, [toyToEdit])

    async function loadToy() {
        try{
        const toy = await toyService.getById(params.toyId)
        setToyToEdit(toy)
        }
        catch(err){
            showErrorMsg('err:', err)
        }
    }

    function onUploaded(imgUrl) {
        setToyToEdit({ ...toyToEdit, imgUrl })
        console.log(toyToEdit)

    }


    async function onSaveToy(ev) {
        ev.preventDefault()

        values.labels=toyLabels
        //console.log(toyToEdit)
        values.imgUrl=toyToEdit.imgUrl || ''
        //console.log(values)
        if(!values.name) return

        try{
            await saveToy(values)
            showSuccessMsg(`Toy added: ${values.name}`)
            navigate('/toy')
        }
        catch(err) {
            console.log('err:', err)
        }
    }

    function onSetFilterByToEdit(value)
    {
        setToyLabels(value )
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
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && <small>{errors.name}</small>}

                <input type="number"
                    id="price"
                    name="price"
                    placeholder="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.price && <small>{errors.price}</small>}

        <span>catagories:
        <LabelCheckbox labels={labels} onSetFilterByToEdit={onSetFilterByToEdit} toyToEdit={values.labels}/>
        </span>

            <div>
                <label htmlFor="inStock">in stock:</label>
                <input type="checkbox" id="inStock"value={values.inStock}
                    onChange={handleChange}
                    onBlur={handleBlur} />
            </div>
            <ImgUploader onUploaded={onUploaded} />
                <button>Save</button>
                <button><Link to="/toy">Back</Link></button>

   
            </form>
           
        </section>
    )
}