import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ManagerGroupDetails from './ManagerGroupDetails';
import React from "react";


export default function ManagersGroups(props) {
    const [groups, setGroups] = useState(null);
    const [showGroup, setShowGroups] = useState('list');
    const [styleState, setStyleState] = useState(true);
    const [Title, setTitle] = useState();
    

    const data = JSON.parse(localStorage.getItem('currentUser'));


    const getGroups = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/managergroups/${data.phone}`);
            result = await result.json();
            if (result[0]) {
                setGroups(result)
            }
            console.log(result)
        }
        catch (error) {
            alert(error);
        }
    }
    

    const changestyle = async () => {
        await setStyleState(!styleState)
    }

    const showGrop = (id,title) => {
        setShowGroups(id)
        setTitle(title)
    }

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-around" , marginTop: "2vh", flexWrap:"wrap"}}>
                {showGroup == 'list' && groups && groups.map((g) =>
                    <>
                        {changestyle}
                        <div onClick={() => showGrop(g.id,g.title)}    key={Date.now()} style={{marginBottom:"1vh"}}>
                         
                            <div className="bg-image  border-bottom-0  border border-dark" >
                                <img  src={require(`../images/${g.title}.jpg`)} className="img1"/>
                                <div className="mask my">    <div className='col bg-warning text-white border-right border-bottom border-left border-dark '>
                                <p className='h2'>{g.titleName}</p>
                                <p className='h1'>{g.name}</p>
                                <p className='h2'>{g.description}</p>
                            </div> </div>
                            </div>
                            <div></div>
                        </div>
                    </>
                )
                }
                 {!groups && <div>you have no groups!</div>}
                {showGroup != 'list' && <ManagerGroupDetails title={Title} managerPhone={data.phone}  changeShowDetails={setShowGroups} id={showGroup} ></ManagerGroupDetails>}
            </div >
        </>
    );
}
