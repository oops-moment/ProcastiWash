import React, { useState } from "react";
import "./washing_machine.css"; // Import the CSS file

const initialMachines = [
  { id: 1, name: "Machine Floor 1", status: "unoccupied", details: null },
  { id: 2, name: "Machine Floor 2", status: "unoccupied", details: null },
  { id: 3, name: "Machine Floor 3", status: "unoccupied", details: null },
  { id: 4, name: "Machine Floor 4", status: "unoccupied", details: null },
];

export function MachineDashboard() {
  const [machines, setMachines] = useState(initialMachines);
  const [formData, setFormData] = useState({});

  const handleInputChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleOccupy = (id) => {
    const data = formData[id] || {};
    if (!data.name || !data.contact || !data.time) {
      alert("Please fill in all details before occupying the machine.");
      return;
    }

    const updatedMachines = machines.map((machine) =>
      machine.id === id
        ? {
            ...machine,
            status: "occupied",
            details: data,
          }
        : machine
    );
    setMachines(updatedMachines);

    // Clear the form data for this machine
    setFormData((prev) => ({ ...prev, [id]: { name: "", contact: "", time: "" } }));
  };

  const handleFree = (id) => {
    const updatedMachines = machines.map((machine) =>
      machine.id === id
        ? { ...machine, status: "unoccupied", details: null }
        : machine
    );
    setMachines(updatedMachines);

    // Clear the form data for this machine
    setFormData((prev) => ({ ...prev, [id]: { name: "", contact: "", time: "" } }));
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