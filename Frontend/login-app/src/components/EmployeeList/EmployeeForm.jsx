import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmployeeList.module.css";

const EmployeeForm = ({ selectedEmployee, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    departmentName: "",
    jobPositionName: "",
  });

  useEffect(() => {
    if (selectedEmployee) setForm(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (selectedEmployee) {
        // Güncelle
        await axios.put(
          `https://localhost:7269/api/Employees/${selectedEmployee.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Ekle
        await axios.post("https://localhost:7269/api/Employees", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      alert("İşlem başarılı!");
      onSuccess();
      setForm({ fullName: "", email: "", departmentName: "", jobPositionName: "" });
    } catch (err) {
      console.error(err);
      alert("Bir hata oluştu!");
    }
  };

  return (
    <form className={styles.employeeForm} onSubmit={handleSubmit}>
      <h3>{selectedEmployee ? "Çalışanı Güncelle" : "Yeni Çalışan Ekle"}</h3>

      <input
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="İsim Soyisim"
        required
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="E-posta"
        required
      />
      <input
        name="departmentName"
        value={form.departmentName}
        onChange={handleChange}
        placeholder="Departman"
        required
      />
      <input
        name="jobPositionName"
        value={form.jobPositionName}
        onChange={handleChange}
        placeholder="Pozisyon"
        required
      />

      <button type="submit">
        {selectedEmployee ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
};

export default EmployeeForm;
