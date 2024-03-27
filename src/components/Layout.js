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
            <Link to="/fundraiser-signup">FundRaiserSignup</Link>
          </li>
          <li>
            <Link to="/fundraiser-login">FundRaiserLogin</Link>
          </li>
          <li>
            <Link to="/donor-login">DonorLogin</Link>
          </li>
          <li>
            <Link to="/donor-signup">DonorSignUp</Link>
          </li>
        </ul>
      </nav>

        <Outlet></Outlet>
        </>

    );
}

export default Layout;