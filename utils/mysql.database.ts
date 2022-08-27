import { Pool, createPool } from "mysql";
import mysql from "mysql2";
import { dbHost, dbUser, db, pwd, dbConnection } from "./constants";

let pool: Pool;

// pool = createPool({
//     connectionLimit: dbConnection,
//     host: dbHost,
//     user: dbUser,
//     password: pwd,
//     database: db,
// });

export const init = () => {
    try {
        pool = createPool({
            connectionLimit: dbConnection,
            host: dbHost,
            user: dbUser,
            password: pwd,
            database: db,
        });

        console.debug("MySql Adapter Pool generated successfully");
    } catch (error) {
        console.error(error);
        console.error("[mysql.connector][init][Error]: ", error);
        throw new Error("failed to initialized pool");
    }
};

/**
 * executes SQL queries in MySQL db
 *
 * @param {string} query - provide a valid SQL query
 * @param {string[] | Object} params - provide the parameterized values used
 * in the query
 */
export const execute = <T>(
    query: string,
    params: string[] | Object
): Promise<T> => {
    try {
        if (!pool)
            throw new Error(
                "Pool was not created. Ensure pool is created when running the app."
            );

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });
    } catch (error) {
        console.error("[mysql.connector][execute][Error]: ", error);
        throw new Error("failed to execute MySQL query");
    }
};
