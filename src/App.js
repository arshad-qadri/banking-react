import React, { useEffect, useState } from "react";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import AuthLayout from "./layout/AuthLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import UserContext from "./services/userContext";
import CustomerForm from "./pages/user/CustomerForm";
import Table from "./pages/user/Table";
import "./App.css";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = (id) => {

    axios
      .get("/json/user.json")
      .then((res) => {
        if (res.data) {
          const userData = res.data?.user?.filter(
            (item) => item.customer_info?.user_id === id
          );
       
          setData(userData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const user = JSON.parse(userToken);
    getData(user?.id);
    setUserData({ isLogin: user ? user : { status: false } });
  }, []);
  useEffect(() => {
    if (userData?.isLogin && !userData?.isLogin?.status) {
      navigate("/");
    }
    //  else if (
    //   userData?.isLogin &&
    //   userData?.isLogin?.status &&
    //   userData?.isLogin?.userType === "admin"
    // ) {
    //   navigate("/admin");
    // } else if (
    //   userData?.isLogin &&
    //   userData?.isLogin?.status &&
    //   userData?.isLogin?.userType === "user"
    // ) {
    //   navigate("/customer-form");
    // }
  }, [userData?.isLogin]);
  useEffect(() => {
    setUserData((perv) => ({ ...perv, data :data}));
  }, [userData?.isLogin,data]);
  if (userData?.isLogin?.userType === "user") {
    return (
      <UserContext.Provider value={[userData, setUserData]}>
        <UserLayout>
          <Routes>
            <Route path="/customer-form" element={<CustomerForm />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </UserLayout>
      </UserContext.Provider>
    );
  } else if (userData?.isLogin?.userType === "admin") {
    return (
      <UserContext.Provider value={[userData, setUserData]}>
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AdminLayout>
      </UserContext.Provider>
    );
  } else {
    return (
      <UserContext.Provider value={[userData, setUserData]}>
        <AuthLayout>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthLayout>
      </UserContext.Provider>
    );
  }
};

export default App;
