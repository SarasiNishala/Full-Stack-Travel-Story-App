import React, { useState } from 'react';
import PasswordInput from '../../components/input/PasswordInput';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    // SignUp API call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password, 
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className='login-ui-box right-10 -top-40'/>
      <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2'/>

      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
        <div className="relative w-[400px] h-[500px] rounded-lg overflow-hidden">
          <div
            style={{ backgroundImage: "url('./src/assets/images/sign-up-bg-image.jpg')" }}
            className="absolute inset-0 bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h4 className="text-4xl font-semibold leading-tight">
              Join the <br /> Adventure
            </h4>
            <p className="text-sm leading-5 mt-3 w-[80%]">
              Record your travel experiences and memories in your personal travel journal.
            </p>
          </div>
        </div>

        <div className='w-2/5 h-[74vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl font-semibold mb-7'>SignUp</h4>

            <input 
              type="text"  
              placeholder='Full Name' 
              className='input-box'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <input 
              type="text"  
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput 
              value={password} 
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>CREATE ACCOUNT</button>

            <p className='text-xs text-slate-500 text-center my-4'>Or</p>

            <button 
              type='button' 
              className='btn-primary btn-light' 
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;