import redis from "redis";
import bluebird from "bluebird";

export * from "./block";
export * from "./peer";

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let redisClient = null;

/**
 * Connect to the redis database
 */
export const connectToDatabase = async () => {
    redisClient = redis.createClient({
        host: "localhost",
        port: 6379,
    });
}

/**
 * Get the redis database
 */
export const getRedisDatabase = () => {
    return redisClient;
}