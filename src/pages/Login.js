import React, { useContext, useState } from "react";
import Input from "../commonComponents/Input";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../services/userContext";

const userData = [
  {
    id: 1,
    email: "user@user.com",
    password: "123456",
    userType: "user",
    status: true,
  },
  {
    id: 2,
    email: "admin@admin.com",
    password: "123456",
    userType: "admin",
    status: true,
  },
];

const Login = () => {
  const [formVal, setFormVal] = useState({ email: "", password: "" });
  const  setIsUserOrAdmin = useContext(UserContext)[1];
  const navigate = useNavigate();
  const handleChange = (e) => {
    let { value } = e.target;
    let { name } = e.target;
    setFormVal((perv) => ({ ...perv, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isUser = userData.some((user) => {
      return (
        user.email === formVal.email.trim() &&
        user.password === formVal.password.trim()
      );
    });
    if (!isUser) {
      alert("User Invalid !");
      return;
    }

    if (isUser) {
      const filter = userData.filter((user) => user.email === formVal.email);
      const user = filter[0];
      localStorage.setItem("userToken", JSON.stringify(user));
      setIsUserOrAdmin({isLogin :user});
      alert("Login successfully !");
      if (user?.userType === "user") {
        navigate("/customer-form");
      } else if (user?.userType === "admin") {
        navigate("/admin");
      }
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              name={"email"}
              type={"email"}
              id={"email"}
              label={"Email"}
              placeholder={"Email"}
              value={formVal.email}
              onChange={handleChange}
            />

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Input
                name={"password"}
                type={"password"}
                id={"password"}
                placeholder={"Password"}
                value={formVal.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
