import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    errors: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    try {
      const user = await AuthService.login(email, password);

      if (!user.error) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setLogin({ ...login, errors: error.response.data.error });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <section className=" px-96 py-16 mx-auto">
      <form onSubmit={handleSubmit} className="p-10 card bg-base-200">
        <div className="flex flex-col text-center w-full">
          <h1 className="text-2xl mb-2 text-white">Log In</h1>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">E-Mail</span>
          </label>
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="input"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>

        {login.errors && (
          <div className="alert alert-error py-3 mt-5">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <label>{login.errors}</label>
            </div>
          </div>
        )}

        <div className="flex flex-col text-center mt-8">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
