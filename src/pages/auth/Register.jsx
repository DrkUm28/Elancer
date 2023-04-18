import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import SelectInput from "../../components/inputs/SelectInput";

const Register = () => {
  const [register, setRegister] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    user_role: 2,
    errors: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, user_role } = register;

    try {
      const user = await AuthService.register(
        first_name,
        last_name,
        email,
        password,
        user_role
      );

      if (!user.error) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setRegister({ ...register, errors: error.response.data.error });
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setRegister({
      ...register,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  return (
    <section className=' px-96 py-16 mx-auto'>
      <form onSubmit={handleSubmit} className='p-10 card bg-base-200'>
        <div className='flex flex-col text-center w-full'>
          <h1 className='text-2xl mb-2 text-white'>Register</h1>
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>First Name</span>
          </label>
          <input
            type='text'
            placeholder='Enter your first name'
            className='input'
            name='first_name'
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Last Name</span>
          </label>
          <input
            type='text'
            placeholder='Enter your last name'
            className='input'
            name='last_name'
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>E-Mail</span>
          </label>
          <input
            type='text'
            placeholder='Enter your e-mail'
            className='input'
            name='email'
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>Password</span>
          </label>
          <input
            className='input'
            name='password'
            type='password'
            placeholder='Enter your password'
            onChange={handleChange}
          />
        </div>

        <SelectInput
          labelText={"Register as:"}
          inputName={"user_role"}
          value={register.user_role}
          options={[
            { label: "Freelancer", value: 2 },
            { label: "Customer", value: 3 },
          ]}
          onChange={handleChange}
        />

        {register.errors && (
          <div className='alert alert-error py-3 mt-5'>
            <div className='flex-1'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='w-6 h-6 mx-2 stroke-current'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
                ></path>
              </svg>
              <label>{register.errors}</label>
            </div>
          </div>
        )}

        <div className='flex flex-col text-center mt-8'>
          <button className='btn btn-primary' type='submit'>
            Register
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
