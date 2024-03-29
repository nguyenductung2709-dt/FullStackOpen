const redis = require('redis');
const { promisify } = require('util');
const { REDIS_URL } = require('../util/config');

let getAsync = () => null;
let setAsync = () => null;

if (REDIS_URL) {
    const client = redis.createClient({
        url: REDIS_URL
    });

    client.on('error', err => {
        console.error('Redis client error:', err);
    });

    getAsync = promisify(client.get).bind(client);
    setAsync = promisify(client.set).bind(client);
}

module.exports = { getAsync, setAsync };
