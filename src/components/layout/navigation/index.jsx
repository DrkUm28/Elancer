import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faUnlock,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navigation = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getIsLoggedIn();

  const logOutUser = () => {
    AuthService.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav className='navbar shadow-lg bg-neutral text-neutral-content'>
        <div className='flex-1 px-2 mx-2'>
          <div className='items-stretch hidden lg:flex'>
            <Link to='/' className='btn btn-ghost btn-sm rounded-btn'>
              <img
                src={logo}
                width='120'
                height='auto'
                className='d-inline-block align-top'
                alt='logo'
              ></img>
            </Link>
          </div>
        </div>

        {currentUser?.role === "admin" && (
          <Link to={"/admin"} className='btn btn-ghost'>
            <FontAwesomeIcon icon={faUnlock} size='lg' />
          </Link>
        )}
        {currentUser ? (
          <div className='flex-none'>
            <Link to={`/profile/${currentUser.id}`} className='btn btn-ghost'>
              <FontAwesomeIcon icon={faUserCircle} size='lg' />
            </Link>
            <button onClick={logOutUser} className='btn btn-ghost btn-square'>
              <FontAwesomeIcon icon={faArrowCircleRight} size='lg' />
            </button>
          </div>
        ) : (
          <div className='flex-none'>
            <Link to='/login' className='btn btn-ghost'>
              Login
            </Link>
            <Link to='/register' className='btn btn-ghost'>
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
