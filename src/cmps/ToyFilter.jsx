// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { useSelector } from 'react-redux'

export function ToyFilter({ filterBy, onSetFilter }) {

    const labels  = useSelector(storeState => storeState.toyModule.labels)
    
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))


    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        console.log(filterByToEdit)
        onSetFilter.current(filterByToEdit)
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

            case 'select-multiple': 
            value = Array.from(target.selectedOptions, (option) => option.value)
            break;


            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            [field]: value
        }));
    }

 

    return (
        <section className="toy-filter full main-layout">
            <fieldset>
            <legend>Toys Filter</legend>
            <form onSubmit={onSetFilterBy}>
                <label htmlFor="name">name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />


            <label htmlFor="inStock" >In stock</label>
                <select
                    onChange={handleChange}
                    name="inStock"
                    value={filterByToEdit.inStock || ''}>
                    <option value=""> All </option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>
            


                <label htmlFor="sortBy">Sort:</label>
                <select name="sortBy" id="sortBy" onChange={handleChange} >
                    <option value="">Select Sorting</option>
                    <option value="name">By name</option>
                    <option value="price">By price</option>
                    <option value="createdAt">By criation date</option>
                </select>
                <label htmlFor="SortByDir">Decending </label>
                <input onChange={handleChange} type="checkbox" id="sortByDir" name="sortByDir" />
                <label htmlFor="labels">Filter By</label>
                <select
                    onChange={handleChange}
                    name="labels"
                    id="labels"
                    multiple
                    value={filterByToEdit.labels || []}>
                    <option value=""> All </option>
                    <>
                        {labels.map(label => <option key={label} value={label}>{label}</option>)}
                    </>
                </select>
            
            </form>
            </fieldset>
        </section>
    )
}