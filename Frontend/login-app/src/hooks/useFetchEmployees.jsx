import { useState, useEffect } from "react";
import axios from "axios";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } catch (err) {
        console.error(err);
        setError("Çalışanlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { employees, loading, error };
};

export default useFetchEmployees;
