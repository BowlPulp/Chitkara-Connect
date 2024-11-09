import React, { useState } from "react";

const TeacherNoticeCreate = () => {
  const [activeTab, setActiveTab] = useState("createMentorNotice");
  const [mentorNotice, setMentorNotice] = useState({
    teacherName: "",
    email: "",
    heading: "",
    description: "",
  });
  const [eventNotice, setEventNotice] = useState({
    eventName: "",
    hostBy: "",
    contactEmail: "",
    date: "",
    time: "",
    description: "",
  });
  const [generalNotice, setGeneralNotice] = useState({
    heading: "",
    contactEmail: "",
    description: "",
  });

  const handleMentorNoticeChange = (e) => {
    const { name, value } = e.target;
    setMentorNotice({ ...mentorNotice, [name]: value });
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventNotice({ ...eventNotice, [name]: value });
  };

  const handleGeneralNoticeChange = (e) => {
    const { name, value } = e.target;
    setGeneralNotice({ ...generalNotice, [name]: value });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "createMentorNotice":
        return (
          <form className="space-y-4">
            <h2 className="text-lg font-semibold">Create Mentor Notice</h2>
            <input
              type="text"
              name="teacherName"
              placeholder="Teacher's Name"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={mentorNotice.teacherName}
              onChange={handleMentorNoticeChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={mentorNotice.email}
              onChange={handleMentorNoticeChange}
              required
            />
            <input
              type="text"
              name="heading"
              placeholder="Notice Heading"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={mentorNotice.heading}
              onChange={handleMentorNoticeChange}
              required
            />
            <textarea
              name="description"
              placeholder="Notice Description"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={mentorNotice.description}
              onChange={handleMentorNoticeChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              Submit Mentor Notice
            </button>
          </form>
        );
      case "createEvent":
        return (
          <form className="space-y-4">
            <h2 className="text-lg font-semibold">Create Event</h2>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.eventName}
              onChange={handleEventChange}
              required
            />
            <input
              type="text"
              name="hostBy"
              placeholder="Hosted By"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.hostBy}
              onChange={handleEventChange}
              required
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.contactEmail}
              onChange={handleEventChange}
              required
            />
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.date}
              onChange={handleEventChange}
              required
            />
            <input
              type="time"
              name="time"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.time}
              onChange={handleEventChange}
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={eventNotice.description}
              onChange={handleEventChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              Submit Event
            </button>
          </form>
        );
      case "createNotice":
        return (
          <form className="space-y-4">
            <h2 className="text-lg font-semibold">Create General Notice</h2>
            <input
              type="text"
              name="heading"
              placeholder="Notice Heading"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={generalNotice.heading}
              onChange={handleGeneralNoticeChange}
              required
            />
            <input
              type="email"
              name="contactEmail"
              placeholder="Contact Email"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={generalNotice.contactEmail}
              onChange={handleGeneralNoticeChange}
              required
            />
            <textarea
              name="description"
              placeholder="Notice Description"
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded-md focus:outline-none"
              value={generalNotice.description}
              onChange={handleGeneralNoticeChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
            >
              Submit General Notice
            </button>
          </form>
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
            onClick={() => setActiveTab("createMentorNotice")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "createMentorNotice"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Create Mentor Notice
          </button>
          <button
            onClick={() => setActiveTab("createEvent")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "createEvent"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Create Event
          </button>
          <button
            onClick={() => setActiveTab("createNotice")}
            className={`px-4 py-2 font-semibold rounded-md ${
              activeTab === "createNotice"
                ? "bg-red-600 text-white"
                : "hover:text-red-400 text-gray-400"
            }`}
          >
            Create Notice
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

export default TeacherNoticeCreate;
