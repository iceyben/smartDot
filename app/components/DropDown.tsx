import React from "react";

const DropDown = () => {
  return (
    <select defaultValue="Shop/Product" className="text-black">
      <option disabled={true}>Shop/Product</option>
      <option>SmartPhone</option>
      <option>Lights/LED</option>
      <option>Microphones</option>
      <option>Accesories</option>
    </select>
  );
};

export default DropDown;
