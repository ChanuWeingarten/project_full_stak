import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { async } from 'q';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCurrentDate } from './functions';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import profile from './images/profile2.png'

export default function Messages(props) {
    const [messages, setMessages] = useState(null);
    const [idsArr, setIdsArr] = useState([]);
    const [arrToUpdate, setArrToUpdate] = useState([]);
    const [sub, setSub] = useState("");
    const [des, setDes] = useState("");
    const [show, setShow] = useState(false)

    const handleClose = () => {
        updateMessages()
        setShow(false);

    }
    const handleOpen = () => {
        getMessages()
        setShow(true);
    }


    const data = JSON.parse(localStorage.getItem('currentUser'));

    const getMessages = async () => {
        let result
        try {
            result = await fetch(`http://localhost:8000/api/dogether/messages/${props.id}/${data.phone}`);
            result = await result.json();
            console.log(result)
            if (result[0]) {
                setMessages(result)
            }
        }
        catch (error) {
            alert(error);
        }
        let arr = []
        for (let i = 0; i < result.length; ++i) {
            if (result[i].status == 0)
                arr.push(result[i].sm_id);
        }
        setIdsArr(arr)
    }

    const updateMessages = async () => {
        setShow(false)
        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'ids': arrToUpdate
            }),
            mode: 'cors'
        };
        try {
            await fetch(`http://localhost:8000/api/dogether/messages`, requestOptions);
        }
        catch (error) {
            alert(error);
        }
        setArrToUpdate([])
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }
        const date = getCurrentDate()[0]
        const d = new Date();
        let h = addZero(d.getHours() + 3);
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());

        const time = h + ":" + m + ":" + s;
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'title': sub,
                'content': des,
                'date': `${date} ${time}`,
                'from': data.phone,
                'phones': props.contactsArr,
                'group': props.id
            }),
            mode: 'cors'
        };
        try {
            await fetch(`http://localhost:8000/api/dogether/messages`, requestOptions);
        }
        catch (error) {
            alert(error);
        }
        handleClose()
        setSub("")
        setDes("")
    }

    const updateStateOfMessages = (id) => {
        let array1 = [...idsArr]
        let array2 = [...arrToUpdate]
        let index = array1.indexOf(id);
        if (index !== -1) {
            array1.splice(index, 1);
            array2.push(id);
            setIdsArr(array1)
            setArrToUpdate(array2)
        }

    }

    useEffect(() => {
        getMessages()
    }, [])


    return (
        <>
            <div className='notification' style={{ position: "fixed", top: "2vh", left: "70%" }}>
                <span onClick={handleOpen} >messages </span>
                <span class="badge">{idsArr.length}</span>
            </div>
            < Offcanvas show={show} onHide={handleClose} animation={false} scroll={true} backdrop={true} placement={"end"} >
                <Offcanvas.Header closeButton>your messages</Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion  >
                        {messages && messages.map((m, index) =>
                            <>
                                <div > 
                                    <Accordion.Item style={{ backgroundColor: idsArr.includes(m.sm_id) ? '#ffc107' : 'white', justifyContent: 'space-between' }} eventKey={index} key={index}>
                                        <Accordion.Header onClick={() => updateStateOfMessages(m.sm_id)}>
                                            <span><img src={profile}></img></span>

                                            <p style={{ justifySelf: "end" }}>{m.from == data.phone ? <span>me </span> : m.from == m.manager_phone ? <span>manager {m.first_name} {m.last_name} </span> : <span>{m.first_name} {m.last_name}</span>}

                                                {m.title != "" ? <span><b>{`${m.title}`} </b> </span> : <span><b>{"no subject"}</b> </span>}
                                            </p>
                                            {(m.date).slice(11, 13) == getCurrentDate()[1].slice(0, 2) && (m.date).slice(0, 10) == getCurrentDate()[0] ? <p className="text-right font-italic" style={{ whiteSpace: "pre" }}> {getCurrentDate()[1].slice(3, 5) - (m.date).slice(14, 16)}   minutes ago </p> : <p className="font-italic ">{(m.date).slice(0, 10)}/{(m.date).slice(11, 16)}</p>}
                                        </Accordion.Header>
                                        <Accordion.Body border="warning">
                                            {m.from == data.phone ? <b>me </b> : m.from == m.manager_phone ? <b>manager {m.first_name} {m.last_name} </b> : <b>{m.first_name} {m.last_name}</b>}
                                            <h3>{m.title}  </h3>
                                            {(m.date).slice(0, 10) == getCurrentDate()[0] ? <h4>today</h4> : <h4>{(m.date).slice(0, 10)}</h4>}
                                            <p className="h3">{m.content}  </p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </div>
                            </>
                        )}
                    </Accordion>
                    <Form onSubmit={(e) => sendMessage(e)}>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <Form.Control value={sub} onChange={(e) => { setSub(e.target.value) }} name="title" placeholder="title" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <Form.Control value={des} onChange={(e) => { setDes(e.target.value) }} as="textarea" type='text' name="content" placeholder="content" />
                        </Form.Group>
                        <Button type="submit" variant="outline-warning"  >send</Button>
                    </Form>

                </Offcanvas.Body>
            </Offcanvas>


        </>
    );

}
