import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

// const { useState } = React

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    async function _login(credentials) {
        try{
            const user = await login(credentials)
            onSetUser(user)
            showSuccessMsg('Logged in successfully')
        }
        catch(err){ console.log('err:',err) }
    }

    async function _signup(credentials) {
        try{
            const user = await signup(credentials)
            onSetUser(user)
            showSuccessMsg('Sighned in successfully')
        }
            catch(err){ console.log('err:',err) }
        }

    return (    
        <div className=" login-page">
            <LoginForm
                onLogin={onLogin}
                isSignup={isSignup}
            />
            <div className="btns">
                <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </a >
            </div>
        </div >
    )
}
