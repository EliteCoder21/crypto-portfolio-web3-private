import { useState } from "react";
import Image from "next/image";
import Router from 'next/router';

import { signUp, signIn } from "../firebase/auth";
import { createUser } from "../firebase/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const { result, error } = await signUp(email, password);
      if (error) throw error;

      await createUser(result.user.uid);
      
      setMessage("Account created!");
    } catch (e) {
      console.log(e.message);
      setMessage(e.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const { result, error } = await signIn(email, password);
      if (error) throw error;

      setMessage("Successfully logged in!");
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <div className="login-wrapper" id="login-wrapper">
      <div>
        <span
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Image
            className="headBar-logo"
            width={150}
            height={60}
            src="/openexamainlogo.png"
            style={{ marginBottom: 20 }}
          />
        </span>
        <input
          id="login-email"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          id="login-password"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button id="login-button" onClick={handleSignIn}>
          LOG IN
        </button>
        <button id="login-button" onClick={handleSignUp}>
          SIGN UP
        </button>
        <p style={{ textAlign: "center", color: "red" }}>{message}</p>
      </div>
    </div>
  );
}
