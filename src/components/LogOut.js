import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'



export default function LogOut() {
    let navigate = useNavigate();
    

    useEffect(() => {
        debugger
        window.localStorage.removeItem("currentUser");
        navigate('/home')
    }, []);

}
