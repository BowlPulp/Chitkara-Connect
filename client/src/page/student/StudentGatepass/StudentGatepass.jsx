import React, { useState } from "react";

const StudentGatepass = () => {
  const [activeTab, setActiveTab] = useState("applyForGatepass");
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    contact: "",
    date: "",
    time: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(""); // Reset the response message before sending

    try {
      const response = await fetch("http://localhost:3000/api/submit-gatepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          approvedStatus: "pending", // Assuming a default "pending" status for new applications
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Gate pass submitted successfully!");
        // Optionally reset the form after successful submission
        setFormData({
          name: "",
          rollNo: "",
          email: "",
          contact: "",
          date: "",
          time: "",
          reason: "",
        });
      } else {
        setResponseMessage(data.message || "Failed to submit gate pass.");
      }
    } catch (error) {
      setResponseMessage("Error submitting gate pass.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "applyForGatepass":
        return (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-200">Apply for Gate Pass</h2>
            {/* Form Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-400">Roll No</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="Enter your Roll Number"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-400">Contact Number</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-400">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-400">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-400">Reason</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter the reason for the gate pass"
                className="w-full h-32 px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        );
      case "appliedGatepass":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Applied Gate Pass</h2>
            <p className="text-gray-200">This section displays all applied gate passes.</p>
          </div>
        );
      case "approvedGatepass":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Approved Gate Pass</h2>
            <p className="text-gray-200">This section shows all approved gate passes.</p>
          </div>
        );
      case "rejectedGatepass":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Rejected Gate Pass</h2>
            <p className="text-gray-200">This section shows all rejected gate passes.</p>
          </div>
        );
      default:
        return <p className="text-gray-200">Select a tab to view content.</p>;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      {/* Small Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-8">
          <button
            onClick={() => setActiveTab("applyForGatepass")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "applyForGatepass"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Apply for Gate Pass
          </button>
          <button
            onClick={() => setActiveTab("appliedGatepass")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "appliedGatepass"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Applied Gate Pass
          </button>
          <button
            onClick={() => setActiveTab("approvedGatepass")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "approvedGatepass"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Approved Gate Pass
          </button>
          <button
            onClick={() => setActiveTab("rejectedGatepass")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "rejectedGatepass"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Rejected Gate Pass
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="p-4 md:p-8">
        {renderContent()}
        {responseMessage && <p className="text-center text-gray-300 mt-4">{responseMessage}</p>}
      </div>
    </div>
  );
};

export default StudentGatepass;
