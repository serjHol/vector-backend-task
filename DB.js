const { Client } = require("pg");

const client = new Client({
	connectionString:
		"postgres://wrwsftlaucmdvi:fb922df7d9ce48cd92b06e8caab1a6d8546bf1065365e2a812522324429a5680@ec2-3-211-6-217.compute-1.amazonaws.com:5432/db1u3e83krf3mo",
	ssl: {
		rejectUnauthorized: false,
	},
});

client.connect();

module.exports = client;
