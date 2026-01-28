import { NextResponse } from 'next/server'
import { pusher } from '@/libs/service/pusher-service'

export async function POST(req: Request) {
    const body = await req.json()
    const event = body.events?.[0]

    if (event?.type === 'message' && event.message.type === 'text') {
        const message = {
            text: event.message.text,
            from: 'line-user',
            userId: event.source.userId,
            createdAt: Date.now(),
        }

        //ส่ง realtime ไปหน้าเว็บ
        await pusher.trigger('line-chat', 'new-message', message)
    }

    return NextResponse.json({ ok: true })
}

// export async function GET() {
//     return NextResponse.json([])
// }