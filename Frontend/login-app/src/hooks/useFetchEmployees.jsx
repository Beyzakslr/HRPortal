import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
   const [totalEmployees, setTotalEmployees] = useState(0);
  const [onLeaveEmployees, setOnLeaveEmployees] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // login sonrası kaydedilen token
        const res = await axios.get("https://localhost:7269/api/employees", {
          headers: {
            Authorization: `Bearer ${token}` // token ekleniyor
          }
        });
        
        setEmployees(res.data);
        

        // İstatistikleri getir
        const [totalRes, leaveRes] = await Promise.all([
          axios.get("https://localhost:7269/api/Employees/Count", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("https://localhost:7269/api/Employees/LeaveCount", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setTotalEmployees(totalRes.data);
        setOnLeaveEmployees(leaveRes.data);


      } catch (err) {
        console.error(err);
        setError("Çalışanlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { employees,totalEmployees, onLeaveEmployees, loading, error };
};

export default useFetchEmployees;
