

import Pusher from 'pusher-js'
import { useEffect, useState } from "react";
import { Items, Message } from '../types/model';




export const useManageMsg = () => {

    const [inputText, setInputText] = useState('')
    const [listText, setListText] = useState<Items[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    // ส่งข้อความไปยัง API /api/send เพื่อส่งต่อไปยัง LINE
    const handleSendMsg = async () => {
        try {

            await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputText, userId: selectedUserId }),
            })

            // alert("ส่งข้อความสำเร็จ ✅");
            setInputText('');
            setListText(prev => [
                ...prev,
                {
                    from: 'web',
                    text: inputText,
                    createdAt: Date.now(),
                },
            ])
        } catch (error) {
            console.error(error);
            alert("ส่งข้อความไม่สำเร็จ ❌");
        }

    }

    // รับข้อความแบบเรียลไทม์จาก Pusher
    const [msgs, setMsgs] = useState<Message[]>([])
    useEffect(() => {
        const pusher = new Pusher(
            process.env.NEXT_PUBLIC_PUSHER_KEY!,
            {
                cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
            }
        )
        // regis event
        const channel = pusher.subscribe('line-chat')
        channel.bind('new-message', (data: Message) => {
            setMsgs(prev => [...prev, data])

            if (data.userId) {
                setSelectedUserId(data.userId)
            }
        })



        return () => {
            channel.unbind_all()
            channel.unsubscribe()
            pusher.disconnect()
        }
    }, [])

    return { handleSendMsg, listText, inputText, msgs, setInputText };
}