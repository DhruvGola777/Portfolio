const NodeCache = require('node-cache');

// Standard TTL (Time To Live) is set to 0 (infinite)
// checkperiod is set to 0 to disable periodic checks since it won't expire
const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

/**
 * Express middleware to cache responses.
 * Note: Only use on GET routes.
 */
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // We only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`[Cache Hit] Serving from cache: ${key}`);
      return res.json(cachedResponse);
    } else {
      console.log(`[Cache Miss] Fetching data for: ${key}`);
      // Intercept the res.json method to save the data to cache before sending it
      const originalJson = res.json;
      res.json = (body) => {
        // If a duration is provided, use it. Otherwise, use stdTTL.
        if (duration) {
          cache.set(key, body, duration);
        } else {
          cache.set(key, body);
        }
        
        // Call the original res.json
        originalJson.call(res, body);
      };
      next();
    }
  };
};

/**
 * Helper function to manually clear a specific cache key
 */
const clearCache = (key) => {
  cache.del(key);
  console.log(`[Cache Cleared] Key: ${key}`);
};

/**
 * Helper function to clear all cache keys starting with a certain prefix
 */
const clearCachePrefix = (prefix) => {
  const keys = cache.keys();
  const keysToDelete = keys.filter(key => key.startsWith(prefix));
  if (keysToDelete.length > 0) {
    cache.del(keysToDelete);
    console.log(`[Cache Cleared] Prefix: ${prefix}, Keys: ${keysToDelete.join(', ')}`);
  }
};

module.exports = {
  cache,
  cacheMiddleware,
  clearCache,
  clearCachePrefix
};
