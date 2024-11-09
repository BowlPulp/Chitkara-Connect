import React, { useState } from "react";

const StudentHome = () => {
  const [activeTab, setActiveTab] = useState("mentorNotice");

  const renderContent = () => {
    switch (activeTab) {
      case "mentorNotice":
        return <p className="text-gray-200">This is the Mentor Notice section.</p>;
      case "events":
        return <p className="text-gray-200">This is the Events section.</p>;
      case "notice":
        return <p className="text-gray-200">This is the Notice section.</p>;
      default:
        return <p className="text-gray-200">Select a tab to view content.</p>;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      {/* Small Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md">
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
            onClick={() => setActiveTab("notice")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "notice"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Notice
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <div className="p-8">{renderContent()}</div>
    </div>
  );
};

export default StudentHome;
