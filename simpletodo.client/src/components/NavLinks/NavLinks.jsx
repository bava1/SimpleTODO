import './NavLinks.css';
import { Link } from 'react-router-dom'

const NavLinks = () => {
    return (
        <section className="nav-links">
            <div className="nav-links_main">
                <Link className="nav-links_main-link" to="/">Home</Link>
                <Link className="nav-links_main-link" to="/tasks">Tasks</Link>
				<Link className="nav-links_main-link" to="/blog">Blog</Link>
				<Link className="nav-links_main-link" to="/weather">Weather</Link>
                <Link className="nav-links_main-link" to="/contact">Contact</Link>
            </div>
        </section>
    )
}

export default NavLinks