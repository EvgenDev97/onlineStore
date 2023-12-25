import React from 'react';
import {
    Routes,
    Route,

} from "react-router-dom";
import {authRoutes, publicRouters} from "../routes";

// import {keys} from "mobx";

const AppRouter = () => {
    const isAuth = false
    return (
        <Routes>
            {isAuth && authRoutes.map(({path,Component})=>{
                return <Route key={path} path={path} element={Component} />
            })}
            {publicRouters.map(({path,Component})=>{
                return <Route key={path} path={path} element={Component}/>
            })}
        </Routes>
    );
};

export default AppRouter;
