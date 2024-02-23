// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useState , useEffect } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useNavigate, useParams ,Link } from "react-router-dom"
import  defaultPic  from '../assets/img/default.jpeg'




export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try{
            const toy=await  toyService.getById(toyId)
            setToy(toy)
        }
        catch(err){
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            }
    }




    if (!toy) return <div>Loading...</div>
    return (
                <section className="car-details">
                    <h1>Toy name : {toy.name}</h1>
                    <h5>Price: ${toy.price}</h5>
                    {toy.labels && toy.labels.length && <h5>Lables:  
                    {toy.labels.map((label, idx) => (
                <span key={idx}>
                { label}
                {idx === toy.labels.length - 1 ? '' : ' ,'}
                </span>
    ))}
            
            </h5>}
            <h5>Created at: {new Date(toy.createdAt).toLocaleDateString()}</h5>
            <h5>In stock? 
            {toy.inStock? ' Yes' : ' No'}
            </h5>
            <img src={defaultPic} alt="Toy" />            
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <button><Link to={`/toy`} >Back</Link></button>
        </section>
    )
}