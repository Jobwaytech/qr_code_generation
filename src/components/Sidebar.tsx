import { useRouter } from "next/router";
import React from "react";

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const Sidebar = (props: Props) => {
  const { sidebarOpen, setSidebarOpen } = props;

  const rooter = useRouter();
  const [activeItem, setActiveItem] = React.useState<string>("Dashboard");

  const active = rooter.pathname.split("/")[1];
  switch (active) {
    case "dashboard":
      if (activeItem !== "Dashboard") setActiveItem("Dashboard");
      break;
    case "company_settings":
      if (activeItem !== "Company Settings") setActiveItem("Company Settings");
      break;
    case "employee_management":
      if (activeItem !== "Employee Management")
        setActiveItem("Employee Management");
      break;
    case "student_management":
      if (activeItem !== "Student Management")
        setActiveItem("Student Management");
      break;
    case "offer_letter_management":
      if (activeItem !== "Offer Letter Management")
        setActiveItem("Offer Letter Management");
      break;
    case "certificate_management":
      if (activeItem !== "Certificate Management")
        setActiveItem("Certificate Management");
      break;
    case "experience_letter_management":
      if (activeItem !== "Experience Letter Management")
        setActiveItem("Experience Letter Management");
      break;
    case "qr_code_management":
      if (activeItem !== "QR Code Management")
        setActiveItem("QR Code Management");
      break;
    default:
      if (activeItem !== "Dashboard") setActiveItem("Dashboard");
      break;
  }

  const navItems = [
    { icon: "📊", label: "Dashboard", link: "" },
    { icon: "🏢", label: "Company Settings", link: "/company_settings" },
    { icon: "👔", label: "Employee Management", link: "/employee_management" },
    { icon: "🎓", label: "Student Management", link: "/student_management" },
    {
      icon: "📄",
      label: "Offer Letter Management",
      link: "/offer_letter_management",
    },
    {
      icon: "🏆",
      label: "Certificate Management",
      link: "/certificate_management",
    },
    {
      icon: "📋",
      label: "Experience Letter Management",
      link: "/experience_letter_management",
    },
    { icon: "📱", label: "QR Code Management", link: "/qr_code_management" },
  ];
  return (
    <>
      {" "}
      {/* Mobile Backdrop */}
      {props.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => props.setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:relative md:w-64 w-full h-full bg-linear-to-b from-slate-900/95 to-slate-800/70 backdrop-blur-md border-r border-purple-500/20 overflow-y-auto shadow-2xl z-40 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-colors z-50"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-700/50 mt-2 md:mt-0">
          <h2 className="text-white font-bold text-sm tracking-wide uppercase">
            Navigation
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                // Close sidebar on mobile after click
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
                window.location.href = item.link; // Navigate to the link
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.label
                  ? "bg-linear-to-r from-purple-600/50 to-indigo-600/30 border-l-4 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/40 hover:border-l-4 hover:border-slate-600"
              }`}
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
