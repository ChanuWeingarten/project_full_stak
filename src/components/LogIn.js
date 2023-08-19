import { Routes, Route, useNavigate } from 'react-router-dom'
import React from 'react'
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; 
import Form from 'react-bootstrap/Form';



export default function LogIn(props) {
    const [isExist, setIsExist] = useState(true);

    const getUser = async (event) => {
        event.preventDefault();
        let password = event.target.userPassword.value;
        let phone = event.target.userPhone.value;
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'password': password
            }),
            mode: 'cors'
        };
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/users/${phone}`,requestOptions);
            result = await result.json();
            if (!result[0]) {
                setIsExist(false);
            }
            else {
                window.localStorage.setItem("currentUser", JSON.stringify({ phone: result[0].phone, id: result[0].id, first_name: result[0].first_name, last_name: result[0].last_name, email: result[0].email }));
                props.handleClose();
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
                    <Modal.Title>log in</Modal.Title>                 
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={getUser}>
                        <Form.Group className="mb-3" controlId="Email">
                            <Form.Label>phone number</Form.Label>
                            <Form.Control type="text" name="userPhone" placeholder="enter your phone number" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>paaword</Form.Label>
                            <Form.Control type="password" name="userPassword" placeholder="enter a password" required/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Text className="text-muted">
                            dogether cares deeply about the privacy of its visitors and users.</Form.Text>
                        </Form.Group>
                        <Form.Group dir="ltr">    
                        <Button type="submit" variant="outline-warning"  >log in</Button>
                        {!isExist&&<Form.Text style={{color:"red"}}>
                        Wrong phone or password, try again
                            </Form.Text>}
                        </Form.Group>
                    </Form>
             
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.signUp} variant="outline-warning" type="button" >new user? you have to sign up</Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        close
                    </Button>
                   
                </Modal.Footer>
            </Modal >
         
        </>
    )
}




