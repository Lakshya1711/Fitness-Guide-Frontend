import React from "react";
import './AuthPopup.css';
const AuthPopup = () => {
  const [showSignup, setShowSignup] = React.useState<boolean>(false)
  return <div className="popup">
    {
      showSignup ? (
        <div>
          <button onClick={() => {
            setShowSignup(false)
          }}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={() => {
            setShowSignup(true)
          }}>Signup</button>
        </div>
      )
    }
  </div>;
};

export default AuthPopup;
