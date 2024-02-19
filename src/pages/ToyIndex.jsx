// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
//import { ADD_CAR_TO_CART } from '../store/reducers/car.reducer.js'
import { useEffect } from 'react'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    //const cart = useSelector(storeState => storeState.carModule.shoppingCart)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsg('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }


    function onSetFilter(filterBy) {
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    /*function addToCart(car) {
        console.log('car:', car)
        console.log(`Adding ${car.vendor} to Cart`)
        dispatch({ type: ADD_CAR_TO_CART, car })
        showSuccessMsg('Added to Cart')
    }*/


    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button> <Link to='/toy/edit'>Add Toy</Link></button>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    //addToCart={addToCart}
                />}
                {isLoading && <div>Loading...</div>}
                <hr />
                {/*<pre>{JSON.stringify(cart, null, 2)}</pre>*/}
            </main>
        </div>
    )

}