import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import commonStyles from '../Styles/CommonStyles'
import {Form,Button} from 'react-bootstrap'
const Register = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword,setVerifyPassword] = useState('');
    const {background,formLayout,header} = commonStyles

    const submitForm = () => {
        console.log({email, password,verifyPassword})
    }
    return(
        <React.Fragment>
            <Navbar showLogin = {true} />
            <div style={background}>
                <Form style = {formLayout}>
                    <h1 style = {header}>Register</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange = {
                                (e) => setEmail(e.target.value)
                            }
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange = {
                                (e) => setPassword(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange = {
                                (e) => setVerifyPassword(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Button variant="success" onClick={submitForm}>
                        Register
                    </Button>
                </Form>

            </div>
        </React.Fragment>

    )
}
export default Register