import React, { useState, useEffect } from "react";

const Itsme = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dob: "",
  });

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName") || "";
    const storedLastName = localStorage.getItem("lastName") || "";
    const storedDob = localStorage.getItem("dateOfBirth") || "";

    setUser({ firstName: storedFirstName, lastName: storedLastName, dob: storedDob });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      const updatedUser = { ...prev, [name]: value };
      localStorage.setItem(name, value);
      return updatedUser;
    });
  };

  return (
    <div>
      <h2>{user.firstName} Profile</h2>
      <label>First Name:</label>
      <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />

      <label>Last Name:</label>
      <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />

      <label>Date of Birth:</label>
      <input type="date" name="dob" value={user.dob} onChange={handleChange} />
    </div>
  );
};

export default Itsme;
