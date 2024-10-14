import mysql from 'mysql2/promise'

export default async function connect() {
    if (global.poolConnections) {
        return await global.poolConnections.getConnection()
    } else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: "",
            database: 'projfinaldb',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });

        global.poolConnections = pool;

        return await global.poolConnections.getConnection()
    }

}