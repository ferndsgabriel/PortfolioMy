import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./middleware/authLogin";

import Portfolio from "./pages/portfolio";
import Home from "./pages/home";

export function RoutesApp (){
    const {IsAuthenticated} = useContext(AuthContext);
    return(
        <BrowserRouter>
            <Routes>
                {IsAuthenticated === true ?(
                    <>
                        <Route path="/portfolio" element={<Portfolio/>}/>
                        <Route path="*" element={<Navigate to='/portfolio'/>}/>
                    </>
                ):(
                    <>
                        <Route path="/" element={<Home/>}/>
                        <Route path="*" element={<Navigate to='/'/>}/>
                    </>
                )}
            </Routes>
        </BrowserRouter>
    )
}