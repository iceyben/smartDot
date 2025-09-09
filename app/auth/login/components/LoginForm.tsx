import React from "react";
import { FaUser } from "react-icons/fa6";

const LoginForm = () => {
  return (
    <div>
      <div>
        <FaUser className="text-3xl" />
      </div>
      <div>
        <h1>User Login</h1>
      </div>
      <form>
        <div>
          <span>Icon</span>
          <label>Email</label>
        </div>
        <div>
          <label>Email</label>
          <span>Icon</span>
        </div>
        <p>forgot password?</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
