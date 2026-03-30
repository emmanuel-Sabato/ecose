const News = require('../models/News');
const Event = require('../models/Event');
const Application = require('../models/Application');

exports.getDashboardStats = async (req, res) => {
  try {
    const [newsCount, eventsCount, applicationsCount] = await Promise.all([
      News.countDocuments(),
      Event.countDocuments(),
      Application.countDocuments()
    ]);

    // Fetch latest activities from different collections
    const [latestNews, latestEvents, latestApps] = await Promise.all([
      News.find().sort({ createdAt: -1 }).limit(3),
      Event.find().sort({ createdAt: -1 }).limit(3),
      Application.find().sort({ createdAt: -1 }).limit(3)
    ]);

    // Merge and format into a unified activity feed
    const activities = [
      ...latestNews.map(n => ({ id: n._id, title: n.title, time: n.createdAt, type: 'news', displayTime: getTimeAgo(n.createdAt) })),
      ...latestEvents.map(e => ({ id: e._id, title: e.title, time: e.createdAt, type: 'calendar', displayTime: getTimeAgo(e.createdAt) })),
      ...latestApps.map(a => ({ id: a._id, title: `New Admission: ${a.fullName}`, time: a.createdAt, type: 'system', displayTime: getTimeAgo(a.createdAt) }))
    ].sort((a, b) => b.time - a.time).slice(0, 6);

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          newsCount,
          eventsCount,
          applicationsCount,
          systemHealth: '99.9%'
        },
        activities
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Simple helper to format time
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}
