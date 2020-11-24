import React from 'react'
import {Alert} from 'react-bootstrap'



const AuthorizationAlert = (props) => {
    const {showAlert,setShowAlert,alertText} = props
    if (showAlert) {
        return (
            <Alert variant="danger" onClose={() => setShowAlert(false)}  dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {alertText}
                </p>
            </Alert>
        );
    }
    return null
}

export default AuthorizationAlert