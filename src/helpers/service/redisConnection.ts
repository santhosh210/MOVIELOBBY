import Redis, { RedisOptions } from "ioredis";

// Configuration options for the Redis client
const redisOptions: RedisOptions = {
  host: "localhost", // Replace with the actual host of your Redis server
  port: 6379, // Replace with the actual port of your Redis server
};

// Create a new instance of the Redis client with the specified options
const redisClient = new Redis(redisOptions);

// Export the Redis client for use in other modules
export default redisClient;
