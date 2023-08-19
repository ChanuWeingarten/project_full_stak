import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'; import Form from 'react-bootstrap/Form';

export default function OpenGroup(props) {
    const [groupId, setGroupId] = useState();
    const [num, setNum] = useState(0);
    const [idxMember, setIdxMember] = useState();
    const [showAddMembers, setShowAddMembers] = useState(false);
    const [showNum, setShowNum] = useState(true);


    const data = JSON.parse(localStorage.getItem('currentUser'));
    let group = { name: "", title: "", description: "" };

    const setGroup = async (event) => {
        event.preventDefault();
        setGroupId(group.id)

        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': event.target.name.value,
                'title': props.id,
                'description': event.target.description.value
            }),
            mode: 'cors'
        };

        try {
            let result = await fetch(`http://localhost:8000/api/dogether/managergroups/${data.phone}`, requestOptions)
            result = await result.json();
            setShowAddMembers(true)
            setGroupId(result.id)
        }
        catch (error) {
            alert(error);
        }
    }

    const addMember = async (event) => {
        setNum(num - 1)
        event.preventDefault();
        console.log(event.target.phone.value);
        let phone = event.target.phone.value
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'phone': phone,
                'group_id': groupId,
            }),
            mode: 'cors'
        };
        try {
            await fetch(`http://localhost:8000/api/dogether/members`, requestOptions);
        }
        catch (error) {
            alert(error);
        }
        if (num - 1 == 0) {
            props.goIntoGroups()
        }
    }

    const numOfMembers = (e) => {
        e.preventDefault()
        setNum(e.target.numOfMembers.value)
        setIdxMember(e.target.numOfMembers.value)
        setShowNum(false)
    }

    return (
        <>
            < Modal show={props.show} onHide={props.handleClose} animation={false} >
                {!showAddMembers &&
                    <>
                        <Modal.Header closeButton >
                            <Modal.Title>{`Create your ${props.name} group`}</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={setGroup}>
                            <Modal.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>group name</Form.Label>
                                    <Form.Control name="name" placeholder="enter your group name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>description </Form.Label>
                                    <Form.Control name="description" placeholder="Write a description of your group and its goals (optional)" />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" variant="outline-warning"  >confirmation and adding</Button>
                            </Modal.Footer></Form>
                    </>}
                {showAddMembers &&
                    <> <Modal.Header closeButton>
                        <Modal.Title>{`Mazel Tov! Your ${group.name} group has been successfully created, It's time to add friends`}</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Form.Text>Enter the phone number and email address of the participants so we can invite them to your group</Form.Text>
                            {showNum && <Form onSubmit={numOfMembers}>
                                <Form.Group className="mb-3">
                                    <Form.Label>How many members do you want to add to the group now?</Form.Label>
                                    <Form.Control type="number" name="numOfMembers" />
                                </Form.Group>
                                <Button type="submit" variant="outline-warning"  >save</Button>
                            </Form>}

                            {num &&
                                <Form onSubmit={addMember}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Participant number {idxMember - num + 1}'s phone number</Form.Label>
                                        <Form.Control type="text" name="phone" placeholder="Enter the participant's phone number" />
                                        <Button type="submit" variant="outline-warning"  >add member</Button>
                                    </Form.Group>
                                </Form>}
                        </Modal.Body></>}
            </Modal>
        </>
    );
}


