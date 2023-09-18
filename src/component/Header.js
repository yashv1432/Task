import React,{useState} from 'react';
import {NavLink} from 'react-router-dom'

const Header = () => {
    const [showLinks, setShowLinks] = useState(false);
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <h2>All Movie</h2>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleLinks}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${showLinks ? 'show' : ''}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item d-lg-none">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item d-lg-none">
                                <NavLink className="nav-link" to='/'>About</NavLink>
                            </li>
                            <li className="nav-item d-lg-none">
                                <NavLink className="nav-link" to='/'>Detail</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="d-none d-lg-block"> {/* Hide on small screens, show on large screens */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/'>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/'>Detail</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;