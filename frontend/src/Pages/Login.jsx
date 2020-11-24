import React, {useState} from 'react'
import Navbar from '../Components/Navbar.jsx'
import commonStyles from '../Styles/CommonStyles.js'
import {Form,Button} from 'react-bootstrap'
import http from '../AxiosConfig/AxiosSettings'
import urls from '../urls.json'
import Alert from '../Components/Alert'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {background,formLayout,header} = commonStyles
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const submitForm = async () => {
       const loginObj = {email,password}
       const {data} = await http.post(urls.loginUser,loginObj)
        if(!data.loggedIn) {
            await setShowAlert(true)
            await setAlertText('Invalid Email or Password')
            return
        }
        localStorage.setItem('token', data.token)
        window.location  = '/profile'
    }
    return (
        <React.Fragment>
            <Navbar showRegister = {true} />
            <div style = {background}>
                <Form style = {formLayout}>
                    <Alert showAlert = {showAlert} setShowAlert={setShowAlert} alertText={alertText} />
                    <h1 style = {header}>Log In</h1>
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
                    <Button variant="primary" onClick={submitForm}>
                        Log In
                    </Button>
                </Form>
            </div>
        </React.Fragment>
    )
}
export default Login