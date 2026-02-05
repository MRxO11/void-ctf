
module.exports = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  console.error("[ERROR]", {
    message: err?.message,
    code: err?.code,
    path: req.originalUrl,
    method: req.method,
  });

  if (err?.code === "23505") {
    return res.status(409).json({ message: "Duplicate value" });
  }

  if (err?.status && Number.isInteger(err.status)) {
    return res.status(err.status).json({
      message: isProd ? "Request failed" : err.message || "Request failed",
    });
  }

  return res.status(500).json({
    message: isProd ? "Something went wrong" : (err?.message || "Internal server error"),
  });
};
