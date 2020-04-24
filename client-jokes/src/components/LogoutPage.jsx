import React, { useEffect } from "react";

const LogoutPage = () => {
  const logoutDeleteToken = () => {
    localStorage.clear();
  };

  useEffect(() => {
    logoutDeleteToken();
  }, []);
  return (
    <div>
      <h1>Thanks for visiting Dad Joke of the Day</h1>
      <h2>You have successfully logged out!</h2>
    </div>
  );
};

export default LogoutPage;
