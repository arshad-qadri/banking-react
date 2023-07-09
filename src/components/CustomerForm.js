import React, { useContext, useEffect, useState } from "react";
import Input from "../commonComponents/Input";
import Selector from "../commonComponents/Selector";
import UserContext from "../services/userContext";
const inpfields = [
  {
    fieldName: "customer_number",
    id: "customer_number",
    name: "customer_number",
    placeholder: "Customer Number",
    type: "number",
    label: "Customer Number",
    inputType: "input",
  },
  {
    fieldName: "customer_name",
    id: "customer_name",
    name: "customer_name",
    placeholder: "Customer Name",
    type: "text",
    label: "Customer Name",
    inputType: "input",
  },
  {
    fieldName: "customer_address",
    id: "customer_address",
    name: "customer_address",
    placeholder: "Customer Address",
    type: "text",
    label: "Customer Address",
    inputType: "input",
  },
  {
    fieldName: "phone",
    id: "phone",
    name: "phone",
    placeholder: "Phone",
    type: "text",
    label: "Phone",
    inputType: "input",
  },
  {
    fieldName: "amount",
    id: "amount",
    name: "amount",
    placeholder: "Amount",
    type: "text",
    label: "Amount",
    inputType: "input",
  },
  {
    fieldName: "currancy",
    id: "currancy",
    name: "currancy",
    placeholder: "Currancy",
    type: "number",
    label: "Currancy",
    inputType: "dropdown",
    dropdownVal: [
      {
        value: "AED",
      },
      {
        value: "EUR",
      },
      {
        value: "CHF",
      },
      {
        value: "MUR",
      },
      {
        value: "USD",
      },
    ],
  },
  {
    fieldName: "account_number",
    id: "account_number",
    name: "account_number",
    placeholder: "Account Number",
    type: "number",
    label: "Account Number",
    inputType: "input",
    dropdownVal: [],
  },
  {
    fieldName: "beneficiary_bank",
    id: "beneficiary_bank",
    name: "beneficiary_bank",
    placeholder: "Benificiary Bank",
    type: "text",
    label: "Benificiary Bank",
    inputType: "input",
  },
  {
    fieldName: "payment_details",
    id: "payment_details",
    name: "payment_details",
    placeholder: "Payment Details",
    type: "text",
    label: "Payment Details",
    inputType: "input",
  },
  {
    fieldName: "region",
    id: "region",
    name: "region",
    placeholder: "Region",
    type: "text",
    label: "Region",
    inputType: "dropdown",
    dropdownVal: [
      {
        value: "Port Louis",
      },
      {
        value: "Curepipe",
      },
      {
        value: "Vacoas",
      },
      {
        value: "Port Mathurin",
      },
    ],
  },
];

const CustForm = ({ existOrNew }) => {
  const [userData, setUserData] = useContext(UserContext);
  const inpFil = {
    customer_number: "",
    customer_name: "",
    customer_address: "",
    phone: "",
    amount: "",
    currancy: "",
    account_number: "",
    beneficiary_bank: "",
    payment_details: "",
    region: "",
  };
  const [formVal, setFormVal] = useState(inpFil);
  

  const handlechange = (e) => {
    const stringRegex = /^[a-zA-Z]+$/;
    const numberRegex = /^[0-9]+$/;
    const { value, name } = e.target;
    if (name === "beneficiary_bank" || name === "payment_details") {
      if (!stringRegex.test(value)) {
        alert("Number Not allowed !");
        return;
      }
    }
    if (name === "phone" || name === "amount") {
      if (!numberRegex.test(value)) {
        alert("String Not allowed !");
        return;
      }
    }
    setFormVal((perv) => ({ ...perv, [name]: value }));
  };
  const getRefrense = ()=>{
    const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  let randomNumber = Math.round(Math.random() * 14789)
  
  const generatedNumber = year + month + day + randomNumber;
  return generatedNumber
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formVal.customer_number ||
      !formVal.customer_name ||
      !formVal.customer_address ||
      !formVal.phone ||
      !formVal.amount ||
      !formVal.currancy ||
      !formVal.account_number ||
      !formVal.beneficiary_bank ||
      !formVal.payment_details ||
      !formVal.region
    ) {
      alert("All fields are required !");
    } else {
      let obj = {
        customer_info: {
          user_id: userData?.isLogin?.id,
          customer_number: parseInt(formVal.customer_number),
          customer_name: formVal.customer_name,
          customer_address: formVal.customer_address,
          phone: parseInt(formVal.phone),
        },

        reference: `cus${getRefrense()}`,
        transfer_amount: formVal.amount,
        transfer_currancy: formVal.currancy,
        beneficiary_bank: formVal.beneficiary_bank,
        payment_details: formVal.payment_details,
      };
      setUserData((perv)=>({...perv, data : [...perv?.data, obj]}))
    }
  };
  useEffect(() => {
    setFormVal(inpFil);
  }, [existOrNew, userData]);
  useEffect(() => {
    if (existOrNew === "existing") {
      if (formVal.customer_number) {
        const filData = userData?.data?.filter(
          (item) =>
            item?.customer_info?.customer_number ===
            parseInt(formVal.customer_number)
        );
        if (filData && filData?.length > 0) {
          setFormVal((perv) => ({
            ...perv,
            customer_name: filData[0]?.customer_info?.customer_name,
            customer_address: filData[0]?.customer_info?.customer_address,
            phone: filData[0]?.customer_info?.phone,
          }));
        }
      }
    }
  }, [formVal.customer_number]);
  return (
    <div className="w-full sm:w-11/12 mx-auto py-4 px-9">
      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 grid-cols-1  gap-x-5 gap-y-2">
          {inpfields.map((item, ind) => {
            if (item.inputType === "dropdown") {
              return (
                <div className=" w-full" key={ind}>
                  <Selector
                    label={item.label}
                    placeholder={item.placeholder}
                    name={item.name}
                    value={formVal[item.fieldName]}
                    id={item.id}
                    dropdown={item.dropdownVal}
                    onChange={handlechange}
                  />
                </div>
              );
            } else {
              return (
                <div className=" w-full" key={ind}>
                  <Input
                    label={item.label}
                    placeholder={item.placeholder}
                    name={item.name}
                    value={formVal[item.fieldName]}
                    type={item.type}
                    id={item.id}
                    onChange={handlechange}
                  />
                </div>
              );
            }
          })}
        </div>
        <button
          type="submit"
          className="inline-block rounded mt-4 bg-gray-800 px-6 pb-2 pt-2.5 text-xs font-medium  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustForm;
