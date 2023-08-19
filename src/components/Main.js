
import { Routes, Route } from 'react-router-dom'
import LogIn from "./LogIn";
import Home from "./Home";
import MainManager from './manager/MainManager';
import MainMember from './member/MainMember';
import LogOut from './LogOut';
import PageNotFound from './PageNotFound';

export default function Main() {
    return (
        <div className="App">
            <Routes>
                <Route exact element={<Home />} path="/" /> 
                <Route exact element={<Home />} path="/home/*" />     
                <Route exact element={<MainManager />} path="/manager/*" /> 
                <Route exact element={<MainMember />} path="/member/*" />
                <Route exact element={<LogOut />} path="/home/logout" />    
                <Route exact element={<PageNotFound />} path="*" />  
            </Routes>
        </div>
    );
}
