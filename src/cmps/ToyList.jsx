import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onRemoveToy }) {

    return (
        <ul className="car-list">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onRemoveToy={onRemoveToy}
                    /*addToCart={addToCart}*/
                />
            )}
        </ul>
    )
}


