import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Correct way to handle cookies
import mysql from "mysql2/promise"; // Ensure you are using mysql2 for async DB queries

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password, userType } = body;

        if (!username || !email || !password || !userType) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        await connection.execute(
            "INSERT INTO users (username, email, password, userType) VALUES (?, ?, ?, ?)",
            [username, email, password, userType]
        );

        await connection.end();

        // Await cookies() and use the returned object correctly
        const cookieStore = cookies();
        await (await cookieStore).set("auth-token", "sample-token-value", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        await (await cookieStore).set("user-type", userType, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return NextResponse.json({ success: true, message: "User registered successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
