import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import Contacts from '../Contacts'
import Messages from '../Messages'
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';

import { Table } from 'react-bootstrap';



export default function ManagerGroupDetails(props) {
    const [memberlist, setMemberlist] = useState(null);
    const [contactsPhones, setContactsPhones] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const memberList = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/groups/${props.id}`);
            result = await result.json();
            if (result) {
                setMemberlist(result)
                let arrIdx = [];
                arrIdx.push(props.managerPhone)
                for (let i = 0; i < result.length; ++i) {
                    arrIdx.push(result[i].phone);
                }
                setContactsPhones(arrIdx)
            }
        }
        catch (error) {
            alert(error);
        }

    }

    const addTasks = async (e) => {
        e.preventDefault();
        let sd = e.target.start_date.value
        let fd = e.target.final_date.value
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'task': e.target.num.value,
                'description': e.target.description.value,
                'start_date': sd,
                'final_date': fd,
                'score': e.target.score.value,
                'phones': contactsPhones
            }),
            mode: 'cors'
        };
        try {
            await fetch(`http://localhost:8000/api/dogether/tasks/${props.id}`, requestOptions);
        }
        catch (error) {
            alert(error);
        }
    }


    const deleteMember = async (phone) => {
        try {
            await fetch(`http://localhost:8000/api/dogether/members/${phone}`, { method: 'DELETE' });
        }
        catch (error) {
            alert(error);
        }
        memberList()
    }

    const deleteGroup = async () => {
        try {
            await fetch(`http://localhost:8000/api/dogether/groups/${props.id}`, { method: 'DELETE' });
            setConfirm(false)
            setDeleted(true)
            window.location.reload()
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        memberList()
    }, [])



    return (
        <>
            <div style={{ backgroundImage: `url(${require(`../images/${props.title}.jpg`)})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100vw", height: "40vh", backgroundPosition: "center", zIndex: "-1", marginTop: "0%", position: "fixed" }} ></div>
            {contactsPhones && <Messages contactsArr={contactsPhones} id={props.id}></Messages>}
            <div style={{ position: "absolute", top: "56vh", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                <Table className='border border-warning' responsive>
                    <thead>
                        <tr > your group's members:</tr>
                        <tr>
                            <th>last name:   </th>
                            <th>first name:   </th>
                            <th>score</th>
                            <th>phone:  </th>
                            <th>email:  </th>
                            <th>status:</th>
                            <th>remove:</th>
                        </tr></thead>

                    {memberlist && memberlist.map(m =>
                        <tbody>
                            <tr>
                                <td>{m.last_name}</td>
                                <td>{m.first_name}</td>
                                <td>  {m.score}</td>
                                <td>{m.phone}</td>
                                <td>{m.email}</td>
                                {m.status_join ? <td>active</td> : <td>Has not joined yet </td>}
                                <button onClick={() => deleteMember(m.phone)}>delete user</button>
                            </tr>
                        </tbody>
                    )
                    }
                </Table>
                <Button onClick={() => props.changeShowDetails('list')} variant="outline-warning" style={{ width: "match-content", height: "2rem" }}>back</Button>
                <Button onClick={() => setConfirm(true)} variant="outline-warning" style={{ width: "match-content", height: "2rem" }}>delete group</Button>
                    {confirm && <div>Are you sure you want to delete the group?</div>}
                    {confirm && <Button onClick={deleteGroup} style={{ width: "match-content", height: "2rem" }} variant="outline-warning" >confirmation</Button>}
                <div style={{ Top: '0vw' ,left:'5vw'}} className='border border-warning'>
                    {!deleted && <Form onSubmit={(e) => addTasks(e)}>
                        <Form.Group className="mb-3" >
                            <Form.Label>you can add tasks here</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>num of task</Form.Label>
                            <Form.Control type="number" name="num" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>score</Form.Label>
                            <Form.Control type="number" name="score" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>description</Form.Label>
                            <Form.Control type="text" as="textarea" name="description" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>start date</Form.Label>
                            <Form.Control type="date" name="start_date" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password" >
                            <Form.Label>final date</Form.Label>
                            <Form.Control type="date" name="final_date" />
                        </Form.Group>
                        <Button type="reset submit " variant="outline-warning" >add</Button>
                    </Form>}
                </div>
            </div>
        </>
    );
}
