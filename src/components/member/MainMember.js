
import MemberNav from "./MemberNav";
import MembersGroups from "./MembersGroups";
import OptionsGroups from "./OptionsGroups";
import MemberGroupDetails from "./MemberGroupDetails";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from "react";
import { NavLink } from 'react-router-dom'



export default function MainManager(props) {

    return (
        <>
            <MemberNav></MemberNav>
            <Routes>
                <Route exact element={<MembersGroups />} path="/mygroups/*" />
                <Route exact element={<MembersGroups />} path="/" />
                <Route exact element={<OptionsGroups />} path="/myoptionsgroups" />
            </Routes>

        </>
    );
}