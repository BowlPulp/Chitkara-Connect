import React, { useState } from "react";

const StudentQueries = () => {
  const [activeTab, setActiveTab] = useState("queries");
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    branch: "",
    tag: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Query submitted:", formData);
    // Reset form after submission if needed
    setFormData({
      name: "",
      rollNo: "",
      email: "",
      branch: "",
      tag: "",
      query: "",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "queries":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Queries</h2>
            <p className="text-gray-200">This section displays all queries.</p>
            {/* Display existing queries here */}
          </div>
        );
      case "sovedQueries":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Solved Queries</h2>
            <p className="text-gray-200">This section displays all solved queries.</p>
            {/* Display solved queries here */}
          </div>
        );
      case "yourQueries":
        return (
          <div>
            <h2 className="text-xl font-bold text-center">Your Queries</h2>
            <p className="text-gray-200">This section shows your submitted queries.</p>
            {/* Display your queries here */}
          </div>
        );
      case "writeQuery":
        return (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-200">Write a Query</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                Name
              </label>
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
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-400">
                Roll No
              </label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
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
              <label htmlFor="branch" className="block text-sm font-medium text-gray-400">
                Branch
              </label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="Enter your branch"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-400">
                Tag
              </label>
              <input
                type="text"
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Enter a tag for your query"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-400">
                Query/Problem
              </label>
              <textarea
                id="query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                placeholder="Describe your query/problem"
                className="w-full h-32 px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Submit Query
            </button>
          </form>
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
            onClick={() => setActiveTab("queries")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "queries"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Queries
          </button>
          <button
            onClick={() => setActiveTab("sovedQueries")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "sovedQueries"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Solved Queries
          </button>
          <button
            onClick={() => setActiveTab("writeQuery")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "writeQuery"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Write Query
          </button>
          <button
            onClick={() => setActiveTab("yourQueries")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "yourQueries"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Your Queries
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="p-4 md:p-8">{renderContent()}</div>
    </div>
  );
};

export default StudentQueries;
