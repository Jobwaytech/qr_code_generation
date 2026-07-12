import React, { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  onMenuClick?: () => void;
  userName?: string;
  userRole?: string;
  showNotifications?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  userName = "Demo User",
  userRole = "Admin",
  showNotifications = true,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, message: "New QR code generated", time: "5 min ago", icon: "📲" },
    { id: 2, message: "Certificate verified", time: "15 min ago", icon: "✅" },
    { id: 3, message: "Offer letter sent", time: "1 hour ago", icon: "📄" },
    {
      id: 4,
      message: "Experience letter approved",
      time: "2 hours ago",
      icon: "📋",
    },
  ];

  return (
    <header className="bg-linear-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50 shadow-xl shadow-slate-900/50 min-w-screen">
      <div className="flex items-center justify-between px-6 py-4 max-w-full">
        {/* Header Left - Logo & Title */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-white hover:text-purple-400 group flex md:hidden"
            title="Toggle Menu"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-3 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all">
              <Image
                src="/Logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-lg tracking-tight group-hover:text-purple-300 transition-colors">
                Smart Verification
              </h1>
              <p className="text-xs text-slate-400">System</p>
            </div>
          </div>
        </div>

        {/* Header Center - Search (Optional) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
            />
            <svg
              className="w-5 h-5 absolute right-3 top-2.5 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Header Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {showNotifications && (
            <div className="relative group">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-all text-slate-300 hover:text-purple-400 relative group/bell"
              >
                <svg
                  className="w-6 h-6 group-hover/bell:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-linear-to-r from-red-500 to-pink-500 rounded-full animate-pulse" />
              </button>

              {/* Notifications Dropdown */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-md border border-purple-500/20 rounded-xl shadow-2xl shadow-slate-900/50 overflow-hidden z-50 animate-fade-in">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <h3 className="text-white font-bold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex gap-3">
                          <span className="text-2xl">{notif.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white group-hover:text-purple-300 transition-colors font-medium">
                              {notif.message}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-700/50 text-center">
                    <button className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Menu */}
          <div className="relative group">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-all group/profile"
            >
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md group-hover/profile:shadow-lg group-hover/profile:shadow-purple-500/40 transition-all group-hover/profile:scale-105">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm text-white font-medium group-hover/profile:text-purple-300 transition-colors">
                  {userName}
                </p>
                <p className="text-xs text-slate-500">{userRole}</p>
              </div>
              <svg
                className="w-4 h-4 text-slate-400 hidden sm:block group-hover/profile:text-purple-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md border border-purple-500/20 rounded-xl shadow-2xl shadow-slate-900/50 overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-4 border-b border-slate-700/50">
                  <p className="text-white font-bold text-sm">{userName}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Role: {userRole}
                  </p>
                </div>

                <div className="py-2">
                  {[
                    { icon: "👤", label: "Profile Settings", href: "#" },
                    { icon: "⚙️", label: "Preferences", href: "#" },
                    { icon: "🔐", label: "Security", href: "#" },
                    { icon: "📊", label: "Activity Log", href: "#" },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      className="px-4 py-2 flex items-center gap-3 text-slate-300 hover:text-purple-300 hover:bg-slate-700/30 transition-all text-sm"
                    >
                      <span>{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="border-t border-slate-700/50 px-4 py-3">
                  <button className="w-full px-4 py-2 bg-linear-to-r from-red-600/30 to-pink-600/30 text-red-300 rounded-lg hover:from-red-600/50 hover:to-pink-600/50 transition-all font-semibold text-sm">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </header>
  );
};

export default Header;
