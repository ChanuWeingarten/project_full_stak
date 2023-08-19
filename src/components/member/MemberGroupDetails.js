import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import Messages from '../Messages'
import Contacts from '../Contacts'
import Button from 'react-bootstrap/Button';
import { getCurrentDate } from '../functions';
import Table from 'react-bootstrap/Table';

export default function MemberGroupDetails(props) {
    const [tasks, setTasks] = useState([]);
    const [contactsPhones, setContactsPhones] = useState([]);
    const data = JSON.parse(localStorage.getItem('currentUser'));
    let navigate = useNavigate();

    const updateContacts = (arr) => {
        let arrIdx = [];
        for (let i = 0; i < arr.length; ++i) {
            arrIdx.push(arr[i].phone);
        }
        setContactsPhones(arrIdx)
    }

    const getTasks = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/tasks/${props.id}/${data.phone}`);
            result = await result.json();
            if (result) {
                setTasks([...result].reverse());
            }
        }
        catch (error) {
            alert(error);
        }
    }

    const updateTask = async (e, id, score, fd) => {
        let finalScore = score;
        let status;
        e.target.checked == true ? status = 1 : status = 0;
        (getCurrentDate()[0] < fd && status == 1) ? finalScore = score : finalScore = score / 2;
        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'status': status,
                'score': score,
                'memberId': props.memId
            }),
            mode: 'cors'
        };
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/tasks/${id}`, requestOptions);
            result = await result.json();
            props.changeScore(result)
        }
        catch (error) {
            alert(error);
        }

        getTasks()
    }

    useEffect(() => {
        navigate('/member/mygroups/groupdetails')
        getTasks();
    }, [])

    return (
        <>
            <Messages contactsArr={contactsPhones} id={props.id} />      
            <div style={{ backgroundImage: `url(${require(`../images/${props.title}.jpg`)})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", width: "100vw", height: "40vh", position: "absolute", backgroundPosition: "center", Top: "6vh", zIndex: "-1" }} ></div>
            <div style={{  position:"absolute", top:"56vh" ,width:"100vw", display:"flex", flexDirection:"row", justifyContent:"space-around" }}>

                <div style={{ width: "50vw", left: "15vw" }}>
                    <span className='text-warning h5'>total score :{props.score}</span>
                    <Table striped style={{ width: "50vw" }}>
                        <thead>
                            <tr>
                                <th style={{ justifyContent: "center" }}>task:</th>
                                <th style={{ justifyContent: "center" }}>starting date:</th>
                                <th style={{ justifyContent: "center" }}>end date:</th>
                                <th style={{ justifyContent: "center" }}>description:</th>
                                <th style={{ justifyContent: "center" }}>score:</th>
                                <th style={{ justifyContent: "center" }}>done:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks[0] &&
                                <tr>
                                    <td className='bg-warning'>{tasks[0].task} current task</td>
                                    <td >{(tasks[0].start_date).toString().slice(0, 10)} - </td>
                                    <td >{(tasks[0].final_date).toString().slice(0, 10)}</td>
                                    <td>{tasks[0].description}</td>
                                    <td>{tasks[0].score}</td>
                                    <td >
                                        <input animation="smooth" shape="curve" onChange={(e) => updateTask(e, tasks[0].statusTaskId, tasks[0].score, tasks[0].final_date)} type="checkbox" checked={(tasks[0].status === 1) ? true : false} />
                                    </td>
                                </tr>}
                            {tasks[0] && tasks.map((t, index) => {
                                return (
                                    index != 0 &&
                                    <tr >
                                        <td>{t.task}</td>
                                        <td>{(t.start_date).toString().slice(0, 10)}</td>
                                        <td>{(t.final_date).toString().slice(0, 10)}</td>
                                        <td>{t.description}</td>
                                        <td>{t.score}</td>
                                        <td>
                                            <input onChange={(e) => updateTask(e, t.statusTaskId, t.score, t.final_date)} type="checkbox" checked={(t.status === 1) ? true : false} />
                                        </td>
                                    </tr>
                                )
                            }

                            )}
                        </tbody>
                    </Table>
               
                <div >
                    <Contacts setContactsList={updateContacts} groupId={props.id}></Contacts>

                </div>
                <Button onClick={() => props.changeShowDetails('list')} variant="outline-warning" height="2rem">back</Button>
            </div>
            </div>


        </>
    );

}
