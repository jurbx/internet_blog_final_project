import { faHome, faInfoCircle, faSignInAlt, faSignOutAlt, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "../scss/HeaderNav.scss";

export default function HeaderNav() {
  return (
    <nav id="headerNav" className="nav justify-content-end w-100">

      <Link to="/home" className="nav-link home"><FontAwesomeIcon icon={faHome} /> Home</Link>
      <Link to="/about" className="nav-link about"><FontAwesomeIcon icon={faInfoCircle} /> About</Link>
      <Link to="/account" className="nav-link account"><FontAwesomeIcon icon={faUser} /> Account</Link>

      <Link to="/sign-in" className="nav-link sign-in"><FontAwesomeIcon icon={faSignInAlt} /> Sign in</Link>
      <Link to="/sign-up" className="nav-link sign-up"><FontAwesomeIcon icon={faUserPlus} /> Sign up</Link>
      <Link to="/sign-in" className="nav-link sign-out"><FontAwesomeIcon icon={faSignOutAlt} /> Sign out</Link>

    </nav>
  )
}
