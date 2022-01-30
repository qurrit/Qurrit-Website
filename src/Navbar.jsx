import React, { useState, useRef, useEffect } from 'react'
import { links, social } from './data'
import { Link } from 'react-router-dom'
import { FaBars, FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import Cookies from 'universal-cookie'

const Navbar = ({ loggedInStatus, handleLogout }) => {
    const [showLinks, setShowLinks] = useState(false)
    const linksContainerRef = useRef(null);
    const linksRef = useRef(null);

    const cookies = new Cookies();
    const history = useNavigate();

    useEffect(() => {
        const linksHeight = linksRef.current.getBoundingClientRect().height
        if (showLinks) {
            linksContainerRef.current.style.height = `${linksHeight}px`
        }
        else {
            linksContainerRef.current.style.height = '0px'
        }
    }, [showLinks])

    const triggerHandleLogout = () => {
        console.log('working')
        handleLogout();
        history("/login")
        window.location.reload();

    }


    if (loggedInStatus === 'NOT_LOGGED_IN') {
        return (
            <nav>
                <div className='nav-center'>
                    <div className='nav-header'>
                        <div>Qurrit logo</div>
                        <button className='nav-toggle'
                            onClick={() => setShowLinks(!showLinks)}
                        >{!showLinks ? <i><FaBars /></i> :
                            <i><FaWindowClose /></i>}</button>

                    </div>

                    <div className='links-container' ref={linksContainerRef}>
                        <ul className='links' ref={linksRef}>
                            {links.map((link) => {
                                const { id, url, text } = link;
                                return (<li key={id}>
                                    <Link to={url}>{text}</Link>
                                </li>)
                            })}
                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <div className='nav-center'>
                    <div className='nav-header'>
                        <div>Qurrit logo</div>
                        <button className='nav-toggle'
                            onClick={() => setShowLinks(!showLinks)}
                        >{!showLinks ? <i><FaBars /></i> :
                            <i><FaWindowClose /></i>}</button>
                    </div>

                    <div className='links-container' ref={linksContainerRef}>
                        <ul className='links' ref={linksRef}>
                            <Link to='/'>home</Link>
                            <Link to='/about'>about</Link>
                            <Link to='/profile'>profile</Link>
                            <button className='logout-button' onClick={triggerHandleLogout}>Logout</button>

                        </ul>

                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;