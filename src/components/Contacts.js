import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import { NavLink } from 'react-router-dom'
import { async } from 'q';


export default function Contacts(props) {
    const [contacts, setContacts] = useState(null);

    const getContacts = async () => {
        try {
            let result = await fetch(`http://localhost:8000/api/dogether/contacts/${props.groupId}`);
            result = await result.json();
            if (result[0]) {
                setContacts(result)
                props.setContactsList(result)
            }
        }
        catch (error) {
            alert(error);
        }
        let arr=new arr[8];
      
    }

    useEffect(() => {
        getContacts()
    }, [])

    return (

        <>
            <table>
                <tr>
                    <th>first name</th>
                    <th>last name </th>
                    <th>phone </th>
                    <th>email </th>
                </tr>
                {contacts && contacts.map((c, i) =>
                    <>
                        {i == 0 && <tr >
                            <td>{c.first_name}</td>
                            <td>{c.last_name}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                            <td>מנהל</td>
                        </tr>}
                        {i != 0 && <tr >
                            <td>{c.first_name}</td>
                            <td>{c.last_name}</td>
                            <td>{c.phone}</td>
                            <td>{c.email}</td>
                        </tr>} 
                    </>
                )}

            </table>
        </>
    );

}

