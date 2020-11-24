import React, {useState, useEffect} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import Logout from './Logout'
const NavigationBar = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const {showRegister,showLogin} = props
    const intiatingLoggedIn = async () => {
        if(localStorage.getItem('token')) await setLoggedIn(true)
    }
    useEffect(() => {
      intiatingLoggedIn()
    }, [])
    return (
        <Navbar bg="dark" variant="dark" expand = 'lg'>
            <Navbar.Brand href='/'>Investagram</Navbar.Brand>
            <Nav className='mr=auto'>
                {loggedIn ? <Nav.Link href = '/profile'> Profile </Nav.Link> : null}
                {loggedIn ? <Nav.Link href = '/feed'> Feed </Nav.Link> : null}
            </Nav>
            <Nav className="ml-auto">
                {loggedIn ? <Logout /> : null}
                {showRegister && !loggedIn ? <Nav.Link href= '/register'>Register</Nav.Link> : null }
                {showLogin && !loggedIn ? <Nav.Link href= '/login'>Login</Nav.Link> : null }
            </Nav>
        </Navbar>
    )
}

export default NavigationBar