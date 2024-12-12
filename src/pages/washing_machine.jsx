import React, { useState, useEffect } from "react";
import axios from "axios";
import "./washing_machine.css";

export function MachineDashboard() {
  const [machines, setMachines] = useState([]);
  const [formData, setFormData] = useState({});

  // Fetch machines from the backend
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost:5001/machines");
        setMachines(response.data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const handleInputChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleOccupy = async (id) => {
    const data = formData[id] || {};
    if (!data.name || !data.contact || !data.time) {
      alert("Please fill in all details before occupying the machine.");
      return;
    }

    try {
      await axios.post(`http://localhost:5001/machines/${id}/occupy`, data);
      setMachines((prev) =>
        prev.map((machine) =>
          machine.id === id
            ? { ...machine, status: "occupied", details: data }
            : machine
        )
      );
      setFormData((prev) => ({ ...prev, [id]: { name: "", contact: "", time: "" } }));
    } catch (error) {
      console.error("Error updating machine status:", error);
    }
  };

  const handleFree = async (id) => {
    try {
      await axios.post(`http://localhost:5001/machines/${id}/free`);
      setMachines((prev) =>
        prev.map((machine) =>
          machine.id === id
            ? { ...machine, status: "unoccupied", details: null }
            : machine
        )
      );
    } catch (error) {
      console.error("Error updating machine status:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Washing Machine Dashboard</h1>
      {machines.map((machine) => (
        <div key={machine.id} className="machine-card">
          <h2 className="machine-name">{machine.name}</h2>
          <div className={`status ${machine.status}`}>
            Status: {machine.status}
          </div>
          <div className="details">
            {machine.status === "occupied" && machine.details ? (
              <>
                <p>Name: {machine.details.name}</p>
                <p>Contact: {machine.details.contact}</p>
                <p>Time: {machine.details.time}</p>
                <button
                  className="free-btn"
                  onClick={() => handleFree(machine.id)}
                >
                  Free Machine
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={(formData[machine.id]?.name || "")}
                  onChange={(e) =>
                    handleInputChange(machine.id, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={(formData[machine.id]?.contact || "")}
                  onChange={(e) =>
                    handleInputChange(machine.id, "contact", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Approx Time"
                  value={(formData[machine.id]?.time || "")}
                  onChange={(e) =>
                    handleInputChange(machine.id, "time", e.target.value)
                  }
                />
                <button
                  className="occupy-btn"
                  onClick={() => handleOccupy(machine.id)}
                >
                  Occupy Machine
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}



// QyKxGuEyl4l5fhXN
// 1u3OYcgMg9OYtZpJ