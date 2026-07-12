import React, { useState } from "react";
import Header from "@/components/Hedder";
import Sidebar from "@/components/Sidebar";

interface StatsCard {
  title: string;
  value: string;
  icon: string;
  iconColor: string;
}

const StatCard: React.FC<StatsCard> = ({ title, value, icon, iconColor }) => (
  <div className="card-hover group relative overflow-hidden p-3 rotate-0 transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-lg hover:shadow-purple-500/30">
    <div className="absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/20 group-hover:via-purple-600/10 group-hover:to-purple-600/0 transition-all duration-300" />
    <div className="relative z-10">
      <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 group-hover:text-purple-300 transition-colors">
        {title}
      </p>
      <p className="text-4xl font-black text-white mb-4 group-hover:scale-105 transition-transform origin-left">
        {value}
      </p>
    </div>
    <div
      className="absolute top-4 right-4 w-16 h-16 rounded-xl bg-linear-to-br from-purple-600/30 to-indigo-600/20 flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-purple-500/40"
      style={{ color: iconColor }}
    >
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats: StatsCard[] = [
    {
      title: "Total Employees",
      value: "1,247",
      icon: "👥",
      iconColor: "#a78bfa",
    },
    {
      title: "Total Students",
      value: "3,892",
      icon: "🎓",
      iconColor: "#f472b6",
    },
    {
      title: "Total Certificates",
      value: "892",
      icon: "🏆",
      iconColor: "#06b6d4",
    },
    {
      title: "Total Offer Letters",
      value: "156",
      icon: "📋",
      iconColor: "#10b981",
    },
    {
      title: "Total Experience Letters",
      value: "234",
      icon: "📄",
      iconColor: "#f59e0b",
    },
  ];

  const moreStats: StatsCard[] = [
    {
      title: "Total QR Codes",
      value: "5,234",
      icon: "📲",
      iconColor: "#06b6d4",
    },
    {
      title: "Today's QR Scans",
      value: "342",
      icon: "🔍",
      iconColor: "#ef4444",
    },
    {
      title: "Active Employees",
      value: "1,089",
      icon: "✅",
      iconColor: "#10b981",
    },
    {
      title: "Active Students",
      value: "3,421",
      icon: "🎯",
      iconColor: "#a78bfa",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Component */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl font-black text-white mb-3 gradient-text drop-shadow-lg">
                Dashboard
              </h1>
            </div>

            {/* Welcome Section */}
            <div className="card mb-8 flex items-center justify-between group hover:glow-effect">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 group-hover:gradient-text transition-all">
                  Welcome, Demo User 👋
                </h2>
                <p className="text-slate-300">
                  Role:{" "}
                  <span className="text-indigo-300 font-semibold bg-indigo-600/20 px-2 py-1 rounded">
                    Admin
                  </span>
                </p>
              </div>
            </div>

            {/* Stats Grid 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Stats Grid 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {moreStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Charts Section */}
              <div className="card group hover:glow-effect">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all">
                    📊 Charts & Analytics
                  </h3>
                  <button className="p-2 rounded-lg hover:bg-purple-600/20 transition-all hover:scale-110">
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="h-56 bg-linear-to-br from-slate-700/30 to-slate-800/20 rounded-lg flex items-center justify-center border border-slate-700/40 group-hover:border-purple-500/40 group-hover:bg-linear-to-br group-hover:from-purple-700/10 transition-all duration-300">
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                    📈 Analytics coming soon...
                  </p>
                </div>
              </div>

              {/* Monthly Statistics */}
              <div className="card group hover:glow-effect">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:gradient-text transition-all">
                    📈 Monthly Statistics
                  </h3>
                  <button className="p-2 rounded-lg hover:bg-purple-600/20 transition-all hover:scale-110">
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="h-56 bg-linear-to-br from-slate-700/30 to-slate-800/20 rounded-lg flex items-center justify-center border border-slate-700/40 group-hover:border-purple-500/40 group-hover:bg-linear-to-br group-hover:from-pink-700/10 transition-all duration-300">
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                    📊 Statistics coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
