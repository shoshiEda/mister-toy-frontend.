// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
import logo from '../assets/img/logo/logo.jpg'


export function HomePage() {

    return (
        <section className='home-page'>
            <h1>Welcome to our magical toy's kingdom</h1>
            <img src={logo} />
        </section >
    )
}