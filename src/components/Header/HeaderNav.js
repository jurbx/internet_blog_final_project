import { faHome, faInfoCircle, faSignInAlt, faSignOutAlt, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6";
import { Button } from "react-bootstrap"
import "./HeaderNav.scss";

export default function HeaderNav({activeTab}) {
  let links = [
    {path: "/", name: "home", icon: faHome},
    {path: "/about", name: "about", icon: faInfoCircle},
    {path: "/sign-in", name: "sign-in", icon: faSignInAlt},
    {path: "/sign-up", name: "sign-up", icon: faUserPlus},
    {path: "/sign-in", name: "sign-out", icon: faSignOutAlt}
  ];

  const cookies = new Cookies();

  let user = cookies.get("user") || {}
  
  function signOut(e) {
    e.preventDefault()
    cookies.remove("user")
    window.location.pathname = "/sign-in"
  }

  return (
    <nav id="headerNav" className="nav justify-content-end w-100">
      {/*
      links.map((link, id) => (
        <Link to={link.path}
       className={`nav-link ${link.name} ${link.name === activeTab ? "active" : ""}`}
             key={`link${id}`}>
          <FontAwesomeIcon icon={link.icon} /> {link.name.replace("-", " ")}
        </Link>))
      */}
      <Link to="/" className="nav-link home"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <Link to="/about" className="nav-link about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
      {user.username
        ? <>
          <Link to={`/users/${user.username}`} className="nav-link account"><FontAwesomeIcon icon={faUser} /> Account</Link>
          <Link to="/sign-in" className="nav-link sign-out" onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</Link></>
        : <>
          <Link to="/sign-in" className="nav-link sign-in"><FontAwesomeIcon icon={faSignInAlt} /> Sign In</Link>
          <Link to="/sign-up" className="nav-link sign-up"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</Link></>
      }
    </nav>
  )
}
