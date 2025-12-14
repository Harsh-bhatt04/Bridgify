export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  for (let key in intervals) {
    const value = intervals[key];
    if (seconds >= value) {
      const count = Math.floor(seconds / value);
      return `${count} ${key}${count > 1 ? "s" : ""} ago`;
    }
  }
}
