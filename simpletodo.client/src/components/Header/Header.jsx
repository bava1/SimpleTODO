//import React from 'react/';
import './Header.css';
import NavLinks from '../NavLinks/NavLinks';
import Logo from '../../assets/img/Logo.png';
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    return (
        <section className="header">
            <div className="header-main">
							<div className="header-main_logo">
								<img src={Logo} className="header-main_logo-img" alt="logo"/>   
							</div>
							<div className="header-main_links">
								<NavLinks />
							</div>
							<div className="header-main_users">
								<FaUserCircle className="header-main_users-icon" />
							</div>
						</div>
        </section>
    )
}

export default Header
//							