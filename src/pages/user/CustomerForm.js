import React, { useState } from "react";
import CustomerForm from "../../components/CustomerForm";

const CustomerForms = () => {
  const [existOrNew, setExistOrNew] = useState("new");
  return (
    <div className="mx-auto w-full flex items-center flex-col gap-y-4">
      <div className="flex">
        <div className="flex gap-x-5">
          <label
            htmlFor="New"
            className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] cursor-pointer"
          >
            {" "}
            New
          </label>
          <input
            name="radioVal"
            id="new"
            value={"new"}
            type="radio"
            className="scale-150 accent-gray-800 cursor-pointer"
            onChange={(e) => setExistOrNew(e.target.value)}
            checked={existOrNew === "new"}
          />
        </div>
        <div className="flex gap-x-5">
          <label
            htmlFor="New"
            className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem] cursor-pointer"
          >
            {" "}
            Existing
          </label>
          <input
            name="radioVal"
            id="radioVal"
            value={"existing"}
            type="radio"
            className="scale-150 accent-gray-800 cursor-pointer"
            onChange={(e) => setExistOrNew(e.target.value)}
            checked={existOrNew === "existing"}
          />
        </div>
      </div>
      <CustomerForm existOrNew={existOrNew} />
    </div>
  );
};

export default CustomerForms;
