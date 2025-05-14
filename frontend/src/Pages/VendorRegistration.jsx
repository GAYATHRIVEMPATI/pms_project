import React, { useState } from "react";

const VendorRegistration = () => {
  const [formData, setFormData] = useState({
    firmName: "",
    gstNo: "",
    firmType: "Proprietorship",
    contactNo: "",
    email: "",
    doorNo: "",
    street: "",
    area: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
    officeContact: "",
    faxNo: "",
    accName: "",
    accNumber: "",
    reAccNumber: "",
    bankName: "",
    branchName: "",
    ifsc: "",
    micrCode: "",
    username: "",
    password: "",
    retypePassword: "",
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="vendor-registration">
      <h2 className="title">Vendor Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        {/* Firm Details */}
        <div className="form-group">
          <input type="text" name="firmName" placeholder="Firm Name" value={formData.firmName} onChange={handleChange} required />
          <input type="text" name="gstNo" placeholder="GST No" value={formData.gstNo} onChange={handleChange} required />
          <select name="firmType" value={formData.firmType} onChange={handleChange} required>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Pvt Ltd">Private Limited</option>
            <option value="Public Ltd">Public Limited</option>
            <option value="Cooperative">Cooperative Society</option>
          </select>
        </div>

        {/* Contact & Address Details */}
        <div className="form-group">
          <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="text" name="doorNo" placeholder="Door No" value={formData.doorNo} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <input type="text" name="area" placeholder="Area" value={formData.area} onChange={handleChange} />
        </div>

        {/* Location Details */}
        <div className="form-group">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
          <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <input type="text" name="pinCode" placeholder="Pin Code" value={formData.pinCode} onChange={handleChange} />
        </div>

        {/* Bank Details */}
        <div className="form-group">
          <input type="text" name="accName" placeholder="Account Name" value={formData.accName} onChange={handleChange} />
          <input type="text" name="accNumber" placeholder="A/C Number" value={formData.accNumber} onChange={handleChange} />
          <input type="text" name="reAccNumber" placeholder="Re-type A/C Number" value={formData.reAccNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleChange} />
          <input type="text" name="branchName" placeholder="Branch Name" value={formData.branchName} onChange={handleChange} />
          <input type="text" name="ifsc" placeholder="IFSC Code" value={formData.ifsc} onChange={handleChange} />
          <input type="text" name="micrCode" placeholder="MICR Code" value={formData.micrCode} onChange={handleChange} />
        </div>

        {/* Login Credentials */}
        <div className="form-group">
          <input type="text" name="username" placeholder="Choose Username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="retypePassword" placeholder="Retype Password" value={formData.retypePassword} onChange={handleChange} required />
        </div>

        {/* Terms & Conditions */}
        <div className="terms">
          <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} required />
          <label>I accept the Terms & Conditions</label>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="reset" className="reset-btn">Reset</button>
        </div>
      </form>
      <style>{`
      .vendor-registration {
        max-width: 900px;
        margin: 20px auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      
      .title {
        background: red;
        color: white;
        text-align: center;
        padding: 10px;
        font-size: 22px;
        border-radius: 5px;
      }
      
      .registration-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .form-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      
      .form-group input,
      .form-group select {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      
      .terms {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .button-group {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
      
      .submit-btn {
        background: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      
      .reset-btn {
        background: #ccc;
        color: black;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
  
      `}</style>
    </div>
  );
};

export default VendorRegistration;
