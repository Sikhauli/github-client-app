import React from 'react';
import { FaGithub } from "react-icons/fa";

const LoginForm = () => {

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;
    const scope = 'user repo';
    
    const handleLogin = () => {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = authUrl;
    };

    return (
        <div className="bg-cover bg-center w-screen min-h-screen flex justify-center items-center">
            <div className="w-96 bg-blue-500 bg-opacity-75 text-white p-8 rounded-lg border border-white">
                <div className="flex flex-col justify-center items-center text-xl font-bold mb-8 text-center">
                    <div className='item-center mb-4'>
                        <FaGithub size={40} className="text-white mx-3" />
                    </div>
                    <p className='capitalize'>Welcome to github client</p>
                    <p className='text-xs'>Login made easy with GitHub authentication</p>
                </div>
                <button type="submit" onClick={handleLogin} className="flex justify-center items-center w-full bg-white text-blue-500 py-2 px-4 rounded-md font-semibold text-lg hover:bg-blue-400 transition duration-300">
                    <FaGithub size={20} className="text-blue mx-3" />
                    <p>Login</p>
                </button>
            </div>
        </div>
    );
};

export default LoginForm;

