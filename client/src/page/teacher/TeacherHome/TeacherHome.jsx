import React, { useState } from "react";

const TeacherHome = () => {
  const [activeTab, setActiveTab] = useState("mentorNotice");

  const renderContent = () => {
    switch (activeTab) {
      case "mentorNotice":
        return (
          <div>
            <h2 className="text-lg font-semibold">Mentor Notices</h2>
            <p className="text-gray-300">This section displays mentor notices.</p>
          </div>
        );
      case "events":
        return (
          <div>
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-gray-300">This section displays upcoming events.</p>
          </div>
        );
      case "notices":
        return (
          <div>
            <h2 className="text-lg font-semibold">Notices</h2>
            <p className="text-gray-300">This section displays various notices.</p>
          </div>
        );
      case "create":
        return (
          <div>
            <h2 className="text-lg font-semibold">Create New Item</h2>
            <p className="text-gray-300">This section will allow you to create new notices or events.</p>
          </div>
        );
      default:
        return <p className="text-gray-200">Select an option to view content.</p>;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-8">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 rounded-md mb-8 shadow-md">
        <div className="flex justify-center space-x-8">
          <button
            onClick={() => setActiveTab("mentorNotice")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "mentorNotice"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Mentor Notice
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "events"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("notices")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "notices"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Notices
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "create"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Create
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="p-8 bg-gray-800 rounded-md shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherHome;
