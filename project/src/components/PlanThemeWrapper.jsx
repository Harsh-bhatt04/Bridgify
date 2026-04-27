// import { useEffect } from "react";

// const PLAN_THEMES = {
//   FREE: {
//     primary: "#0f172a",   // default slate
//     accent: "#2563eb",    // blue
//   },
//   GOLD: {
//     primary: "#92400e",   // gold brown
//     accent: "#f59e0b",    // gold
//   },
//   PLATINUM: {
//     primary: "#4c1d95",   // royal purple
//     accent: "#a78bfa",   // violet
//   },
//   DIAMOND: {
//     primary: "#0f172a",   // dark blue
//     accent: "#22d3ee",   // cyan
//   },
// };

// export default function PlanThemeWrapper({ children }) {
//   useEffect(() => {
//     const userStr = localStorage.getItem("user");
//     const user = userStr ? JSON.parse(userStr) : null;

//     const plan = user?.plan || "FREE";
//     const theme = PLAN_THEMES[plan] || PLAN_THEMES.FREE;

//     document.documentElement.style.setProperty("--primary-color", theme.primary);
//     document.documentElement.style.setProperty("--accent-color", theme.accent);
//   }, []);

//   return children;
// }