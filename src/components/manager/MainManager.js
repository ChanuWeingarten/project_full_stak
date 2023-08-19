import ManagerNav from "./ManagerNav";
import ManagersGroups from "./ManagersGroups";
import NewGroup from "./NewGroup";
import { Routes, Route } from 'react-router-dom'
import React from "react";




export default function MainManager(props) {

    return (
        <>
            <ManagerNav></ManagerNav>
            <Routes>
                <Route exact element={<ManagersGroups />} path="/mygroups" />
                <Route exact element={<ManagersGroups />} path="/" />
                <Route exact element={<NewGroup />} path="/newgroup/*" />
            </Routes>

        </>
    );
}