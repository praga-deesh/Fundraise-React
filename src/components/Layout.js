import {Outlet,Link} from "react-router-dom"
import './Layout.css';

function Layout() {
    return (
        <>
      <nav>
        <ul>
        <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/fundraiser-SIGNUPn">FundRaiserSignup</Link>
          </li>
          <li>
            <Link to="/fundraiser-login">FundRaiserLogin</Link>
          </li>
          <li>
            <Link to="/donor-login">Donor Login</Link>
          </li>
          <li>
            <Link to="/donor-signup">Donor SignUp</Link>
          </li>
        </ul>
      </nav>

        <Outlet></Outlet>
        </>

    );
}

export default Layout;