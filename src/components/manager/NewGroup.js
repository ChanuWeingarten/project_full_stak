import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import OpenGroup from './OpenGroup';
import { Navigate } from 'react-router-dom';


export default function NewGroup() {
    const [titles, setTitles] = useState(null);
    const [showform, setShowform] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    let navigate = useNavigate();

    const getTitle = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/titles`);
            result = await result.json();
            if (result[0]) {
                setTitles(result)
            }
            handleShow();
        }
        catch (error) {
            alert(error);
        }
    }

    const openNew = (id) => {
        setShowform(id)
    }

    const showGroups = () => { 
        navigate('/manager')
    }


    useEffect(() => {
        getTitle();
    }, [])

    return (
        <>
            {console.log(titles)}
            <div className='con' style={{ display: "flex", flexWrap:"wrap", justifyContent: "space-around", marginTop:"6vh"}}>
           
                {titles && titles.map((t,index) =>

                    <div onClick={() => openNew(t.id)} className="hovereffect img1"   key={index} style={{margin: "2vw 2vw", borderRadius:'6%'}}>
                        <img src={require(`../images/${t.id}.jpg`)}  className="img1" />
                        <div className="overlay "  >
                            <b className='h1' style={{color:'#e3e3e3',borderColor:'#e3e3e3'}}>{t.name}</b>
                            <br/>
                            <span>{t.description}</span>
                            {showform == t.id && <div ><OpenGroup show={show} goIntoGroups={showGroups}  id={t.id} name={t.name} handleClose={handleClose}></OpenGroup></div>}
                        </div>
                    </div>


                )}
            </div>
        </>
    );
}


