const rateLimit = require("express-rate-limit");

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute in milliseconds
  max: 3,
  message: "You have exceeded the 3 requests in 1 minute limit!",
  headers: true,
});

module.exports = rateLimiterUsingThirdParty;
