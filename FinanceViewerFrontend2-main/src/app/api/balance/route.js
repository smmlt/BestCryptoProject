'use server';
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const currency = searchParams.get("currency");
        const address = searchParams.get("address");

        if (!currency || !address) {
            return NextResponse.json(
                { error: "Currency or address not specified" },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!baseUrl) {
            return NextResponse.json(
                { error: "NEXT_PUBLIC_API_BASE_URL is not set in the environment" },
                { status: 500 }
            );
        }

        const apiUrl = `${baseUrl}/balance?currency=${currency}&address=${address}`;

        const response = await fetch(apiUrl, {
            headers: { "ngrok-skip-browser-warning": "1" },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Server error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (err) {
        console.error("Proxy error:", err);
        return NextResponse.json(
            { error: "Failed to retrieve data" },
            { status: 500 }
        );
    }
}
