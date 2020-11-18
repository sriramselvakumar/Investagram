import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
const navbar = (props) => {
    const {showRegister,showLogin} = props
    return (
        <Navbar bg="dark" variant="dark" expand = 'lg'>
            <Navbar.Brand href='/'>Investagram</Navbar.Brand>
            <Nav className="ml-auto">
                {showRegister ? <Nav.Link href= '/register'>Register</Nav.Link> : null }
                {showLogin ? <Nav.Link href= '/login'>Login</Nav.Link> : null }
            </Nav>

        </Navbar>
    )


}

export default navbar