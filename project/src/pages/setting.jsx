import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Trash,
  LogOut,
  Camera,
  Lock,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* TITLE */}
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SettingsIcon size={30} className="text-blue-500" />
          Settings
        </h1>

        {/* PROFILE SECTION */}
        <Section title="Profile" icon={<User className="text-blue-500" />}>
          <div className="flex gap-6 items-center">
            {/* Profile Image */}
            <div className="relative w-20 h-20 group">
              <img
                src="https://i.pravatar.cc/150?img=32"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-700"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow hover:bg-blue-700 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Input Fields */}
            <div className="flex-1 grid gap-3">
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" />
            </div>
          </div>

          <textarea
            className="p-3 rounded-xl w-full border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 mt-4"
            rows="3"
            placeholder="Bio / About Me"
          />

          <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all">
            Save Changes
          </button>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" icon={<Palette className="text-purple-500" />}>
          <div className="flex justify-between items-center py-2">
            <span>Theme Mode</span>
            <ThemeToggle />
          </div>
        </Section>

        {/* NOTIFICATIONS */}
        <Section title="Notifications" icon={<Bell className="text-yellow-500" />}>
          <Toggle label="Email Notifications" />
          <Toggle label="Project Updates" />
          <Toggle label="New Followers" />
          <Toggle label="Messages Alerts" />
        </Section>

        {/* PRIVACY */}
        <Section title="Privacy" icon={<Shield className="text-green-500" />}>
          <Select options={["Public Profile", "Only Connections", "Private"]} />

          <Select
            className="mt-3"
            options={["Messages from Everyone", "Connections Only"]}
          />
        </Section>

        {/* SECURITY */}
        <Section title="Security" icon={<Lock className="text-red-500" />}>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl">
            Change Password
          </button>
          <Toggle label="Two-Factor Authentication" className="mt-3" />
        </Section>

        {/* DANGER ZONE */}
        <Section
          title="Danger Zone"
          icon={<Trash className="text-red-600" />}
          danger
        >
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl">
            Delete Account
          </button>

          <button className="mt-3 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </Section>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Section({ title, icon, children, danger }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl shadow-md border transition-all ${
        danger
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      {children}
    </motion.div>
  );
}

function Input({ placeholder }) {
  return (
    <input
      className="p-3 rounded-xl border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      placeholder={placeholder}
    />
  );
}

function Select({ options, className }) {
  return (
    <select
      className={`p-3 rounded-xl w-full border bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${className}`}
    >
      {options.map((op, i) => (
        <option key={i}>{op}</option>
      ))}
    </select>
  );
}

function Toggle({ label, className }) {
  return (
    <div className={`flex justify-between items-center py-2 ${className}`}>
      <span>{label}</span>
      <input type="checkbox" className="toggle-switch" />
    </div>
  );
}

function ThemeToggle() {
  return (
    <div className="relative inline-block w-12 h-6 cursor-pointer">
      <input type="checkbox" className="opacity-0 peer w-full h-full" />
      <div className="absolute inset-0 bg-gray-400 peer-checked:bg-blue-600 rounded-full transition"></div>
      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition"></div>
    </div>
  );
}
