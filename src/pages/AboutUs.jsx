import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import marker from '../assets/img/marker.png'


const AnyReactComponent = () => (
    <div style={{ width: '30px', height: '30px' }}>
      <img src={marker} alt="marker" style={{ width: '100%', height: '100%' }} />
    </div>
  )


export function AboutUs() {

    const API_KEY = 'AIzaSyDjDltgtQwxED3ok2n1iMs2rMmpU2vcYao'


    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCenter({ lat, lng })
    }
    
    return (
        <section>
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
            <ul>Our stores located at:
                <li>Tel Aviv :Arlozarov street 100</li>
                <li>Haifa :Grand canion,Simcha golan street 54 </li>
                <li>Hadera :Herbert samuel street 85</li>
            </ul>
            <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:API_KEY }}
                center={center}
                defaultZoom={zoom}
                onClick={handleClick}
                yesIWantToUseGoogleMapApiInternals
            >
               <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
          />

                
            </GoogleMapReact>
        </div>
        <button onClick={()=> setCenter({ lat: 32.0853, lng: 34.7818 })}>TLV</button>
        <button onClick={()=> setCenter({ lat: 32.78869, lng: 35.00802 })}>Haifa</button>
        <button onClick={()=> setCenter({ lat: 32.43547, lng: 34.9229 })}>Hadera </button>

        </section>
    )
}
