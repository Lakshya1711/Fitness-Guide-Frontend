import React from "react";
import './AuthPopup.css';
import Image from "next/image";
import logo from "@/assets/logo.png"
import Input from '@mui/joy/Input';
import { Button } from "@mui/joy";

const AuthPopup = () => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false)

  const handleLogin = () => { }
  const handleSignup = () => { }
  return <div className="popup">
    {
      showSignup ? (
        <div>
          <button onClick={() => {
            setShowSignup(false)
          }}>Login</button>
        </div>
      ) : (
        <div className="authform">
          <div className="left">
            <Image src={logo} alt='Logo' />
          </div>
          <div className="right">
            <h1>Choose the Right Path towards Fitness</h1>
            <form action="">
              <Input
                color="primary"
                disabled={false}
                placeholder="Email"
                size="lg"
                variant="soft"
              />

              <Input
                color="primary"
                disabled={false}
                placeholder="Password"
                size="lg"
                variant="soft"
              />
              <Button onClick={() => {
                handleLogin
              }}>Login</Button>
            </form>
            <p>Don't have an account ? <button onClick={() => {
              setShowSignup(true)
            }}>Signup</button></p>
          </div>

        </div>
      )
    }
  </div>;
};

export default AuthPopup;
