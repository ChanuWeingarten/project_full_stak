import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MemberGroupDetails from './MemberGroupDetails'
import React from "react";


export default function MembersGroups(props) {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    const [groups, setGroups] = useState(null);
    const [showDetails, setShowDetails] = useState('list');
    const [memberId, setMemberId] = useState();
    const [memScore, setMemberScore] = useState();
    const [Title, setTitle]= useState();


    const groupsList = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/membergroups/${data.phone}`);
            result = await result.json();
            if (result) {
                setGroups(result)
            }
        }
       
        catch (error) {
            alert(error);
        }
    }

    const enterIntoGroup = (id,memId,memScore, title) => { 
        setShowDetails(id)
        setMemberId(memId)
        setMemberScore(memScore)
        setTitle(title)
    }

    useEffect(() => {
         groupsList()
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "space-around" , flexWrap:"wrap" , marginTop:"0vh"}}>
            {showDetails == 'list' && groups && groups.map((g,i) =>
                <div style={{marginTop:"10vh"}}  className="bg-image  border-bottom-0  border border-dark" key={i}  onClick={()=>enterIntoGroup(g.id, g.member_id, g.score,g.title)}>
                      <img src={require(`../images/${g.title}.jpg`)}  className="img1" />
                      <div className='col bg-warning text-white border-right border-bottom border-left border-dark' dir="rtl">
                    <p className='h2'>{g.name}</p>
                    <p className='h1'>{g.description}</p>
                    </div>              
                </div>
            )}
             {showDetails == 'list' && !groups && <div>you have no groups!</div>}
            {showDetails != 'list' && <MemberGroupDetails title={Title} changeShowDetails={setShowDetails} changeScore={setMemberScore} score = {memScore} memId={memberId} id= {showDetails}  ></MemberGroupDetails>}
        </div>
    );

}
