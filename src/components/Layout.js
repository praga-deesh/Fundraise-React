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
            <Link to="/test">Test</Link>
          </li>
         
          <li>
            <Link to="/donor-login">Login</Link>
          </li>
          
        </ul>
      </nav>

        <Outlet></Outlet>
        </>

    );
}

export default Layout;