import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import commonStyles from '../Styles/CommonStyles'
import {Form,Button} from 'react-bootstrap'
import http from '../AxiosConfig/AxiosSettings'
import Alert from '../Components/Alert'
import urls from '../urls.json'
const Register = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword,setVerifyPassword] = useState('');
    const {background,formLayout,header} = commonStyles
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileImg, setProfileImg] = useState('');

    const validateEmail = (email) => {
        const expression =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return expression.test(String(email).toLowerCase())
    }
    const submitForm = async () => {
        if(password !== verifyPassword) {
            await setShowAlert(true)
            await setAlertText('Please enter your password again')
            return
        }
        else if(password.length < 9) {
            await setShowAlert(true)
            await setAlertText('Password must be 9 characters long')
            return
        }
        else if(firstName.length < 1 || lastName.length < 1){
            await setShowAlert(true)
            await setAlertText('Make sure both first name and last name are not empty')
            return
        }

        else if(!validateEmail(email)) {
            await setShowAlert(true)
            await setAlertText('Please enter a valid email address')
            return
        }

        const Investor = {
            firstName,
            lastName,
            password,
            email,
            profileImg
        }

        const {data}  = await http.post(urls.registerUser,Investor)

        if(!data.validImage) {
            await setShowAlert(true)
            await setAlertText('You entered an invalid link')
            return
        }

        else if(!data.validEmail){
            await setShowAlert(true)
            await setAlertText('This email address already exists')
            return
        }
        localStorage.setItem('token', data.token)
        window.location = '/profile'
    }


    return(
        <React.Fragment>
            <Navbar showLogin = {true} />
            <div style={background}>
                <Form style = {formLayout}>
                    {showAlert ? <Alert
                        showAlert = {showAlert}
                        setShowAlert = {setShowAlert}
                        alertText = {alertText}
                    /> : null
                    }
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
                        <Form.Text >
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
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            placeholder = 'First Name'
                            onChange = {
                                (e) => setFirstName(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Last Name </Form.Label>
                        <Form.Control
                            placeholder = 'Last Name'
                            onChange = {
                                (e) => setLastName(e.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Profile Image Url(optional)</Form.Label>
                        <Form.Control
                            placeholder = 'Image Url'
                            onChange = {
                                (e) => setProfileImg(e.target.value)
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