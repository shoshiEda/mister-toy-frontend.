import { LongTxt } from '../cmps/LongTxt.jsx'


export function ReviewPreview({review,idx}){


    return(
        <section className="new-review" key={idx}>
        <p> by: {review.by.fullname}</p>
        <div><LongTxt txt={review.txt} length={review.txt.length} /></div>
        </section>) 
}