function compareVersions(current, target) {
  const a = current.split(".").map(Number);
  const b = target.split(".").map(Number);

  const len = Math.max(a.length, b.length);

  for (let i = 0; i < len; i++) {
    const x = a[i] || 0;
    const y = b[i] || 0;

    if (x < y) return -1;
    if (x > y) return 1;
  }

  return 0;
}

export default function handler(req, res) {
  try {
    const config = {
      latestVersion: "1.1.4",
      minimumVersion: "1.0.2",
      updateUrl: "https://smartproduction.vercel.app/",
      message: "Network status updated",
    };

    const currentVersion = req.query.version || "0.0.0";

    const isUpdateAvailable =
      compareVersions(currentVersion, config.latestVersion) === -1;

    const isForceUpdate =
      compareVersions(currentVersion, config.minimumVersion) === -1;

    res.status(200).json({
      ...config,
      isUpdateAvailable,
      isForceUpdate,
      currentVersion,
    });
  } catch (error) {

    res.status(500).json({
      error: "Server crashed",
      message: error.message,
    });
  }
}