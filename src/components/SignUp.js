import React from 'react'
import {  useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function SignUp(props) {

    let navigate = useNavigate();

    const setUser = async (event) => {   
        event.preventDefault();
        let User = {
            "phone": event.target.phone.value,
            "id": 0,
            "first_name": event.target.first_name.value,
            "last_name": event.target.last_name.value,
            "email": event.target.email.value,
        }
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'phone': User.phone,
                'first_name': User.first_name,
                'last_name': User.last_name,
                'email': User.email,
                'password': event.target.password.value
            }),
            mode: 'cors'
        };
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/users`, requestOptions);
            result = await result.json();
            if(!result){ 
                alert("user already exist")
            }
            else{ 
            User.id = result[0];
            props.handleClose()
            window.localStorage.setItem("currentUser", JSON.stringify({ phone: User.phone, id: User.id, first_name: User.first_name, last_name: User.last_name, email: User.email }));  
            navigate("/home")
            }
        }
        catch (error) {
            alert(error);
        }
    }



    return (
        <>
            < Modal show={props.show} onHide={props.handleClose} animation={false} >
                <Modal.Header closeButton>
                    <Modal.Title>create profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={setUser}>
                        <Form.Group className="mb-3" dir="rtl">
                            <Form.Label>שם פרטי</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="first name" />
                        </Form.Group>
                        <Form.Group className="mb-3" dir="rtl">
                            <Form.Label>שם משפחה</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="last name" />
                        </Form.Group>
                        <Form.Group className="mb-3" dir="rtl">
                            <Form.Label>מספר טלפון</Form.Label>
                            <Form.Control type="text" name="phone" placeholder="your phone" required />
                        </Form.Group>
                        <Form.Group className="mb-3" dir="rtl">
                            <Form.Label>E-mail address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="your email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" dir="rtl">
                            <Form.Label>סיסמא</Form.Label>
                            <Form.Control type="password" name="password" placeholder="chose password" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Text className="text-muted" dir="rtl">
                                dogether cares deeply about the privacy of its visitors and users.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" variant="outline-warning"  >sign up</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.logIn} variant="outline-warning" type="button" >registered user? you have to log in</Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}

