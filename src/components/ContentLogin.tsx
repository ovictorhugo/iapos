import { GoogleLogo, SignIn } from "phosphor-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

import React, { useContext, useState } from 'react';

import "firebase/auth";


import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from "../lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../contexts/context";




export function ContentLogin() {
  // meial sneha

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      
      setTimeout(() => {
        history('/dashboard');
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  //



  const backgroundImages = [
    '/src/assets/img1.jpg',
    '/src/assets/img2.jpg',

    // Adicione mais URLs de imagens de fundo, se necessário
  ];
  const history = useNavigate();

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
        setLoggedIn(true);
        setTimeout(() => {
          history('/dashboard');
        }, 1000);
      })
      .catch((error) => {
        console.log(error)
      })
  }



  //background
  const [backgroundImage, setBackgroundImage] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  });

  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="w-full h-screen justify-between px-6 md:px-16 flex bg-[#000000] bg-opacity-30 backdrop-blur-sm ">
        <div className="flex items-center">
          <Link to={"/"} className="h-12 ">
            <Logo />
          </Link>
        </div>

        <div className="w-full md:w-[510px] flex items-center ">
          <div className="w-full rounded-md bg-white px-14 py-10">
            <header className="mb-8">
              <h4 className="text-4xl font-medium text-left mb-4">Fazer login</h4>
              <div className="flex gap-2"><p className="text-md  text-gray-500">Ainda não tem uma conta?</p><Link to="" className="text-md  text-blue-400 hover:text-blue-500">Crie uma conta</Link></div>
            </header>

            <form className="w-full mb-6">
              <p className="text-sm text-gray-500 mb-2">Endereço de email</p>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 border-[1px] border-gray-300 w-full h-12 rounded-md outline-none p-4 text-md hover:border-blue-400 focus:border-blue-400" />

              <p className="text-sm text-gray-500 mb-2">Senha</p>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 border-[1px] border-gray-300 w-full h-12 rounded-md outline-none p-4 text-md hover:border-blue-400 focus:border-blue-400" />

              <button type="submit" onClick={handleLogin} className="whitespace-nowrap flex items-center gap-4 bg-blue-400 text-white rounded-md px-4 py-2 justify-center hover:bg-blue-500  font-medium transition w-min ml-auto">
                <SignIn size={16} className="text-white" /> Continuar
              </button>
            </form>

            <div className="flex items-center justify-center my-12 gap-2">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <p className="text-gray-400 bg-white text-center">Ou</p>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>

            <div>
              <button type="button" onClick={handleGoogleSignIn} className="w-full text-sm font-bold cursor-pointer h-12 p-4 text-gray-400 border-[1px] border-solid bg-white border-gray-300 rounded-lg justify-center items-center flex outline-none  hover:bg-blue-100 focus:border-blue-400 gap-3  transition focus:bg-blue-100">
                <GoogleLogo size={16} className="text-gray-500" />Fazer login com o Google
              </button>
            </div>

            <p className="font=bold text-sm text-red-400 pt-4"></p>
          </div>
        </div>

      </div>

    </div>
  );
}