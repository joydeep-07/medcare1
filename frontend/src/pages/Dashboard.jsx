import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiSettings,
  FiBell,
  FiSearch,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaUserMd,
  FaProcedures,
  FaClinicMedical,
  FaStethoscope,
} from "react-icons/fa";
import doctors_list from "../Components/doctors_list"; // Assuming this path is correct

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // New state for dropdown

  // Process doctor data for charts
  const departmentCount = doctors_list.reduce((acc, doctor) => {
    acc[doctor.department] = (acc[doctor.department] || 0) + 1;
    return acc;
  }, {});

  const departmentData = Object.keys(departmentCount).map((dept) => ({
    name: dept,
    doctors: departmentCount[dept],
  }));

  // Patient visit data by department (sample) - Kept as is for consistency
  const visitData = [
    {
      name: "Jan",
      "General Medicine": 1200,
      Cardiology: 800,
      Neurology: 600,
      Pediatrics: 1500,
      Orthopedics: 700,
      Dermatology: 500,
    },
    {
      name: "Feb",
      "General Medicine": 1300,
      Cardiology: 850,
      Neurology: 650,
      Pediatrics: 1600,
      Orthopedics: 750,
      Dermatology: 550,
    },
    {
      name: "Mar",
      "General Medicine": 1400,
      Cardiology: 900,
      Neurology: 700,
      Pediatrics: 1700,
      Orthopedics: 800,
      Dermatology: 600,
    },
    {
      name: "Apr",
      "General Medicine": 1250,
      Cardiology: 820,
      Neurology: 680,
      Pediatrics: 1550,
      Orthopedics: 780,
      Dermatology: 520,
    },
    {
      name: "May",
      "General Medicine": 1500,
      Cardiology: 950,
      Neurology: 750,
      Pediatrics: 1800,
      Orthopedics: 850,
      Dermatology: 650,
    },
  ];

  // Appointment status data (sample)
  const appointmentData = [
    { name: "Completed", value: 1250 },
    { name: "Scheduled", value: 480 },
    { name: "Cancelled", value: 120 },
  ];

  // Enhanced color palette for charts - more vibrant and premium
  const COLORS = [
    "#4F46E5", // Indigo-600
    "#10B981", // Green-500
    "#F59E0B", // Yellow-500
    "#EF4444", // Red-500
    "#8B5CF6", // Purple-500
    "#06B6D4", // Cyan-500
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-br from-indigo-800 to-indigo-900 text-white transition-all duration-300 shadow-lg relative`}
      >
        <div className="p-4 flex items-center justify-between border-b border-indigo-700">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold tracking-wide">MediCare</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-indigo-700 p-2 rounded-md transition-colors duration-200"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="mt-8">
          {/* Sidebar Navigation Items */}
          {[
            { id: "overview", icon: FiHome, label: "Overview" },
            { id: "doctors", icon: FaUserMd, label: "Doctors" },
            { id: "departments", icon: FaClinicMedical, label: "Departments" },
            { id: "appointments", icon: FiCalendar, label: "Appointments" },
            // You can add more menu items here
          ].map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-4 mx-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeTab === item.id
                  ? "bg-indigo-700 shadow-md"
                  : "hover:bg-indigo-700 hover:shadow-sm"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="ml-4 text-md">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96 max-w-md border border-gray-200 focus-within:border-indigo-400 transition-colors duration-200">
            <FiSearch className="text-gray-500 mr-3" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="flex items-center space-x-6 relative">
            {" "}
            {/* Added relative for dropdown positioning */}
            <button className="relative p-2 rounded-full hover:bg-gray-200 transition-colors duration-200">
              <FiBell size={22} className="text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)} // Toggle dropdown
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User"
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-400 group-hover:border-indigo-600 transition-colors duration-200"
              />
              <span className="ml-3 flex items-center font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                Admin
                <FiChevronDown
                  className={`ml-1 text-gray-500 group-hover:text-gray-700 transition-transform duration-200 ${
                    userDropdownOpen ? "rotate-180" : "" // Rotate icon when open
                  }`}
                />
              </span>
            </div>
            {/* User Profile Dropdown */}
            {userDropdownOpen && (
              <div className="absolute right-0 top-14 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-200">
            Medical Dashboard <span className="text-indigo-600">Overview</span>
          </h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-10">
            <div className="bg-white rounded-xl shadow-lg p-7 flex items-center transform hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-blue-500 text-white mr-5 shadow-md">
                <FaUserMd size={26} />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Total Doctors</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {doctors_list.length}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-7 flex items-center transform hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-green-500 text-white mr-5 shadow-md">
                <FaClinicMedical size={26} />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Departments</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {Object.keys(departmentCount).length}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-7 flex items-center transform hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-purple-500 text-white mr-5 shadow-md">
                <FaProcedures size={26} />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Monthly Visits</p>
                <p className="text-3xl font-extrabold text-gray-900">4,250</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-7 flex items-center transform hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-yellow-500 text-white mr-5 shadow-md">
                <FaStethoscope size={26} />
              </div>
              <div>
                <p className="text-gray-600 text-lg">Active Appointments</p>
                <p className="text-3xl font-extrabold text-gray-900">480</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-10">
            {/* Doctors by Department - Pie Chart */}
            <div className="bg-white rounded-xl shadow-lg p-7">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                Doctors by Department
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120} // Slightly larger pie
                    fill="#8884d8"
                    dataKey="doctors"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />{" "}
                  {/* Added legend */}
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Patient Visits by Department - Line Chart */}
            <div className="bg-white rounded-xl shadow-lg p-7">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                Monthly Patient Visits by Department
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart
                  data={visitData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Line
                    type="monotone"
                    dataKey="General Medicine"
                    stroke={COLORS[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Cardiology"
                    stroke={COLORS[1]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Neurology"
                    stroke={COLORS[2]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Pediatrics"
                    stroke={COLORS[3]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Second Row of Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Appointment Status - Bar Chart */}
            <div className="bg-white rounded-xl shadow-lg p-7">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                Appointment Status
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={appointmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={COLORS[0]}
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Department Comparison - Area Chart */}
            <div className="bg-white rounded-xl shadow-lg p-7">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                Department Comparison
              </h3>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart
                  data={visitData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Area
                    type="monotone"
                    dataKey="General Medicine"
                    stackId="1"
                    stroke={COLORS[0]}
                    fill={COLORS[0]}
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="Cardiology"
                    stackId="1"
                    stroke={COLORS[1]}
                    fill={COLORS[1]}
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="Pediatrics"
                    stackId="1"
                    stroke={COLORS[2]}
                    fill={COLORS[2]}
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
