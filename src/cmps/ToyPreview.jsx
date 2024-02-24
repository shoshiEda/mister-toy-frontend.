import { Link } from "react-router-dom"
import  defaultPic  from '../assets/img/default.jpeg'
import { useSelector } from 'react-redux'


// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy/*, addToCart*/ }) {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    return (
        <li className="toy-preview" key={toy._id}>
            <Link to={`/toy/${toy._id}`} >
                <h4>{toy.name}</h4>
            </Link>
            <p>Price: <span>${toy.price}</span></p>
            <p>Created At: <span>{new Date(toy.createdAt).toLocaleDateString()}</span></p>
            <img src={defaultPic} alt="Toy" />            

            {user && user.isAdmin && <div>
                <button onClick={() => {
                    onRemoveToy(toy._id)
                }}>x</button>
                <button><Link to={`/toy/edit/${toy._id}`}>edit</Link></button>
            </div>}
            {/*<button className="buy" onClick={() => {
                addToCart(car)
            }}>Add to Cart</button>*/}

        </li>
    )
}
