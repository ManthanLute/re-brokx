import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { email, password, user_type } = req.body;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

        if ((users as any[]).length === 0) {
            await connection.end();
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = (users as any[])[0];

        if (user.user_type !== user_type) {
            return res.status(403).json({ message: 'Unauthorized user type' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, user_type: user.user_type }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await connection.end();
        return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, user_type: user.user_type } });
    } catch (error) {
        return res.status(500).json({ message: 'Database error', error });
    }
}
