import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { message } = await req.json()

    const res = await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
            to: process.env.LINE_USER_ID, //groupId / roomId
            messages: [
                {
                    type: 'text',
                    text: message,
                },
            ],
        }),

    })
    const data = await res.text() // LINE ส่ง error message มา

    console.log('LINE status:', res.status)
    console.log('LINE response:', data)

    if (!res.ok) {
        return NextResponse.json({ success: false, error: data }, { status: res.status })
    }

    return NextResponse.json({ success: res.ok })
}
