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
    <div className="bg-gradient-to-r from-base-200 to-base-300 min-h-[90.7vh] w-[75vw] absolute right-0 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-base-content mb-2 drop-shadow-lg">Welcome to Your Dashboard</h1>
          <p className="text-lg text-base-content/70">Here you can view your event stats, manage bookings, and more!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-base-100/80 rounded-xl shadow-lg flex flex-col items-center p-6 hover:scale-105 transition-transform">
              <div className="text-5xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-lg text-base-content mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-base-100/70 rounded-xl shadow p-8 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-primary mb-2">Get Started</h2>
          <p className="text-base-content mb-4">Use the sidebar to navigate through your dashboard features. You can book new events, view your gallery, update your profile, and more.</p>
          <button className="px-6 py-2 bg-primary text-primary-content rounded-lg shadow hover:bg-primary-focus transition-colors">Book an Event</button>
        </div>
      </div>
    </div>
  );
};

export default Overview;