import React from "react";

const Selector = ({
  label,
  id,
  name,
  onChange,
  value,
  className,
  placeholder,
  dropdown,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <select value={value} className={`${className} h-10 block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 focus:outline-0 sm:text-sm sm:leading-6`} onChange={onChange} name={name} >
          <option defaultValue={""}>{placeholder}</option>
          {dropdown && dropdown.length > 0
            ? dropdown.map((item, ind) => (
                <option value={item.value} key={ind}>
                  {item.value}
                </option>
              ))
            : ""}
        </select>
      </div>
    </div>
  );
};

export default Selector;
