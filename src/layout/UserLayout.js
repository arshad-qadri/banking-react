import React from "react";
import Navbar from "../components/Navbar";
const navigation = [
  { name: 'Cutomer Form', href: '/customer-form', current: false },
  { name: 'Table', href: '/table', current: false },

]
const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar navigation={navigation}  />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
};

export default UserLayout;
