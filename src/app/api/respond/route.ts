// app/api/line/webhook/route.ts
import { NextResponse } from 'next/server'
import { pusher } from '@/libs/service/pusher-service'

// export const lineUsers = new Set<string>()

// export const addLineUser = (userId: string) => {
//     lineUsers.add(userId)
// }

// export const getLineUsers = () => {
//     return Array.from(lineUsers)
// }

export async function POST(req: Request) {
    const body = await req.json()

    for (const event of body.events || []) {
        if (event.type === 'message' && event.message.type === 'text') {
            console.log('event.source', event)
            const userId = event.source.userId

            // เก็บ userId   
            console.log('userId', userId)
            // addLineUser(userId)

            const message = {
                text: event.message.text,
                from: 'line-oa',
                userId,
                createdAt: Date.now(),
            }

            // realtime ไปหน้าเว็บ
            await pusher.trigger('line-chat', 'new-message', message)
        }
    }

    return NextResponse.json({ ok: true })
}
