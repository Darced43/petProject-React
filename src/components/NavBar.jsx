import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar () {

    return(
        <nav className="flex justify-between w-full px-20 py-5 bg-red-400">
            <NavLink to='/' className="navLink activeStyle" >лист задача</NavLink>
            <NavLink to='/magazin' className="navLink" >магазин</NavLink>
            <NavLink to='/wether' className="navLink" >погода</NavLink>
        </nav>
    )
}