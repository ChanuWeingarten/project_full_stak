import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import Button from 'react-bootstrap/Button';

export default function OptionsGroups(props) {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    const [groups, setGroups] = useState([]);
    const [joinbyid, setJoinbyid] = useState([]);
    const [show, setShow] = useState(false);


    const optionGroupsList = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/memberoptiongroups/${data.phone}`);
            result = await result.json();
            if (result) {
                setGroups(result)
            }
        }
        catch (error) {
            alert(error);
        }
    }


    const join = async () => {
        let requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                'ids': joinbyid
            }),
            mode: 'cors'
        };
        try {
            await fetch(`http://localhost:8000/api/dogether/memberoptiongroups`,requestOptions);
        }
        catch (error) {
            alert(error);
        }
        if(joinbyid.length == groups.length){ 
            setShow(true)
        }
        optionGroupsList();
    }

    const addJoin = (e,id) => {
        let arr = [...joinbyid];
        if(e.target.checked==true){
        arr.push(id)
        setJoinbyid(arr)
        }
        else{ 
            arr = arr.filter((i) => i != id); 
            setJoinbyid(arr)
        }
    }

    useEffect(() => {
        optionGroupsList()
    }, [])

    return (
        <>    <div className='con' style={{ display: "flex", flexWrap:"wrap", justifyContent: "space-around", marginTop:"15vh"}}>
            {groups && groups.map(og =>
                <div  className="img1 row">
                    <img src={require(`../images/${og.title}.jpg`)}  className="img1" />
                    <div >{og.name}</div>
                    <div>{og.description}</div>
                    <input onChange={(e)=>addJoin(e,og.id)} type={'checkbox'}></input>
                </div>
            )}
            { groups.length != 0 && <Button className="row" variant="outline-warning" onClick={join} style={{height: "2rem", width:"match-content"}}>join</Button>}
            {(groups.length == 0 || show) && <div>There are no groups waiting for your to join!</div>}
            </div>
        </>
    );
}

