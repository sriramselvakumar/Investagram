import React from 'react'
import {Button} from 'react-bootstrap'

const LogoutButton = () => {
    const logoutEvent = () => {
        localStorage.removeItem('token')
        window.location = '/'
    }
    return(
        <Button variant="outline-danger" onClick = {logoutEvent}>Logout</Button>
    )
}

export default LogoutButton