import { useState } from "react";
import axios from "axios";
import "./CallsPage.css";

export default function AddCall() {

   const API = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    call_id: "",
    customer_name: "",
    mobile: "",
    address: "",
    product_name: "",
    product_type: "",
    problem: "",
    call_type: "",
    lat: "",
    lng: "",
    specialization: "",
    main_category: "",
    sub_category: "",
    component_type: "",
    make: "",
    capacity: "",
    quantity: "",
    serial_number: ""
  });

  /* ===== FIX: GENERIC INPUT HANDLER ===== */
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async () => {
    try {
      await axios.post(`${API}/create-call`, data);

      alert("✅ Complaint Booked Successfully");

    } catch (err) {
      console.log(err);
      alert("❌ Error booking complaint");
    }
  };

  return (
    <div className="content">

      <h2>Add Call Details</h2>

      <div className="complaint-box">

        {/* ===== CUSTOMER DETAILS ===== */}
        <div className="form-grid">

          <input name="call_id" placeholder="Call ID"
            onChange={handleChange} />

          <input name="customer_name" placeholder="Customer Name"
            onChange={handleChange} />

          <input name="mobile" placeholder="Mobile"
            onChange={handleChange} />

          <input name="address" placeholder="Address"
            onChange={handleChange} />

          <input name="product_name" placeholder="Product Name"
            onChange={handleChange} />

          <input name="product_type" placeholder="Product Type"
            onChange={handleChange} />

          <input name="problem" placeholder="Problem"
            onChange={handleChange} />

          <input name="call_type" placeholder="Call Type"
            onChange={handleChange} />

          <input name="lat" placeholder="Latitude"
            onChange={handleChange} />

          <input name="lng" placeholder="Longitude"
            onChange={handleChange} />

          <input name="specialization"
            placeholder="Specialization (UPS/Inverter/Battery)"
            onChange={handleChange}
          />
        </div>


        {/* ===== PRODUCT DETAILS ===== */}
        <div className="addcall-card">

          <h3>Product Details</h3>

          <input name="main_category"
            placeholder="Main Category"
            onChange={handleChange} />

          <input name="sub_category"
            placeholder="Sub Category"
            onChange={handleChange} />

          <input name="component_type"
            placeholder="Component Type"
            onChange={handleChange} />

          <input name="make"
            placeholder="Make"
            onChange={handleChange} />

          <input name="capacity"
            placeholder="Capacity"
            onChange={handleChange} />

          <input name="quantity"
            placeholder="Qty"
            onChange={handleChange} />

          <input name="serial_number"
            placeholder="Serial Number"
            onChange={handleChange} />

        </div>

      </div>

      <button className="submit-btn" onClick={submitForm}>
        Book Complaint
      </button>

    </div>
  );
}
