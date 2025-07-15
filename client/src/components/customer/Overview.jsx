import React from "react";


const Overview = () => {
  // Example stats, replace with real data as needed
  const stats = [
    { label: "Total Bookings", value: 12, icon: "📅" },
    { label: "Upcoming Events", value: 3, icon: "🎉" },
    { label: "Feedback Given", value: 5, icon: "💬" },
    { label: "Support Tickets", value: 1, icon: "🛠️" },
  ];

  return (
    <div className="bg-gradient-to-r from-red-200 to-indigo-200 min-h-[90.7vh] w-[75vw] absolute right-0 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 drop-shadow-lg">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600">Here you can view your event stats, manage bookings, and more!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/80 rounded-xl shadow-lg flex flex-col items-center p-6 hover:scale-105 transition-transform">
              <div className="text-5xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
              <div className="text-lg text-gray-700 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-white/70 rounded-xl shadow p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Get Started</h2>
          <p className="text-gray-600 mb-4">Use the sidebar to navigate through your dashboard features. You can book new events, view your gallery, update your profile, and more.</p>
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition-colors">Book an Event</button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
