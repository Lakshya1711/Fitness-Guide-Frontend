import React from "react";
import './AuthPopup.css';
import Image from "next/image";
import logo from "@/assets/logo.png"
import Input from '@mui/joy/Input';
import { Button } from "@mui/joy";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

interface AuthPopupProps {
  setShowpopup: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthPopup: React.FC<AuthPopupProps> = ({ setShowpopup }) => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false)

  const handleLogin = () => { }
  const handleSignup = () => { }
  return <div className="popup">
    <button className="close" onClick={() => {
      setShowpopup(false)
    }}><AiOutlineClose /></button>
    {
      showSignup ? (
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
                placeholder="Name"
                size="lg"
                variant="soft"
              />
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

              <div className="form_input_leftright">
                <Input color="primary" size="lg" variant="outlined" type="number" placeholder="Age" />
                <Input color="primary" size="lg" variant="outlined" type="number" placeholder="Weight" />
              </div>

              <Select
                color="primary"
                placeholder="Gender"
                size="lg"
                variant="outlined"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              <br />
              <label htmlFor="">Height</label>
              <div className="form_input_leftright">
                <Input color="primary" size="lg" variant="outlined" type="number" placeholder="ft" />
                <Input color="primary" size="lg" variant="outlined" type="number" placeholder="in" />
              </div>
              <Button onClick={() => {
                handleSignup
              }}>Signup</Button>
            </form>
            <p>Already have an account ? <button onClick={() => {
              setShowSignup(false)
            }}>Login</button></p>
          </div>

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
