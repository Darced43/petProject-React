import React from "react";
import { Link } from "react-router-dom";

export function NavBar () {
    function navStyle (event) {
        const nav = document.querySelector('nav')
        const aLinks = nav.querySelectorAll('.navLink')
    
        for (let i = 0; i < aLinks.length; i++) {
          const element = aLinks[i]
          element.classList.remove('activeStyle')
        }
        const aLink = event.currentTarget
        aLink.classList.add('activeStyle')
      }

    return(
        <nav className="flex justify-between w-full px-20 py-5 bg-red-400">
            <Link to='/' className="navLink activeStyle" onClick={navStyle}>лист задача</Link>
            <Link to='/magazin' className="navLink" onClick={navStyle}>магазин</Link>
            <Link to='/wether' className="navLink" onClick={navStyle}>погода</Link>
        </nav>
    )
}