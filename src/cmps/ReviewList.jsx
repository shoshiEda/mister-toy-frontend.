import { ReviewPreview } from "./ReviewPreview.jsx";
import { useSelector } from 'react-redux'



export function ReviewList({ratings,onDeleteReview}){

    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    return(
        <ul className="review-list">
        {ratings.map((review,idx) => 
         <li key={idx}>
        <ReviewPreview review={review} idx={idx} />
        {user && (user._id===review.by._id) && <button onClick={()=>onDeleteReview(review.id)}>X</button> }
        <hr />
             
        </li>
        )}
        </ul>
        )}