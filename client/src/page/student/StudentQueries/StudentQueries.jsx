import React, { useState, useEffect } from "react";

const StudentQueries = () => {
  const [activeTab, setActiveTab] = useState("queries");
  const [formData, setFormData] = useState({
    topic: "",
    tags: "",
    query: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    rollNo: "",
    email: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // API request to get user info from token
      fetch(`http://localhost:3000/api/post-data-from-token/${token}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          // Extract user information from the decoded data
          const { name, RollNo, email } = data.decoded;

          // Store the extracted data in state
          setUserData({
            name,
            rollNo: RollNo,
            email,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Handle error (Optional: reset user data state)
          setUserData({
            name: "Error fetching data",
            rollNo: "",
            email: "",
          });
        });
    } else {
      console.log("No token found");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Process tags (separate them by commas and remove extra spaces)
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
  
    const queryData = {
      name: userData.name,
      rollNo: userData.rollNo,
      email: userData.email,
      topic: formData.topic,
      tags: tagsArray,
      query: formData.query,
      likes: 0,  // Default likes set to 0
      solution: null,  // Default solution is null
    };
  
    console.log("Query data to be submitted:", queryData);
  
    // Send query data to the API endpoint
    fetch("http://localhost:3000/api/submit-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Show success or error message from the API
        }
      })
      .catch((error) => {
        console.error("Error submitting query:", error);
        alert("Failed to submit query. Please try again later.");
      });
  
    // Reset form after submission if needed
    setFormData({
      topic: "",
      tags: "",
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
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-center text-gray-200">
              Write a Query
            </h2>

            <div>
              <label
                htmlFor="topic"
                className="block text-sm font-medium text-gray-400"
              >
                Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter the topic of your query"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-400"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags for your query (separate by commas)"
                className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use <span className="font-semibold">#</span> to create tags and "
                , " to separate them (e.g., #networking, #database).
              </p>
            </div>

            <div>
              <label
                htmlFor="query"
                className="block text-sm font-medium text-gray-400"
              >
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
