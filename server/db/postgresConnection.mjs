import pg from "pg"
const { Pool } = pg

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Restaurant',
    password: 'root',
    port: 5432,
});

export const connectDB = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Database connected successfully');
            }
        });
    });
};