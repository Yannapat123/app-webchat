'use client'
import { useManageMsg } from '../hooks/hooks-send-msg';



export const Container = () => {
    const { handleSendMsg, listText, inputText, setInputText, msgs } = useManageMsg();
    const allMessages = [...msgs, ...listText].sort(
        (a, b) => a.createdAt - b.createdAt
    )
    return (
        <div className="max-w-md  md:w-3xl mx-auto h-130 bg-gray-100 rounded-lg shadow-lg flex flex-col">

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {allMessages.map((m, i) => {
                    const isWeb = m.from === 'web'

                    return (
                        <div
                            key={i}
                            className={`flex ${isWeb ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-3 py-2 rounded-lg ${isWeb
                                    ? 'bg-green-500 text-white rounded-br-none'
                                    : 'bg-gray-300 text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <div className="text-xs opacity-75 mb-1">
                                    {new Date(m.createdAt).toLocaleTimeString()}
                                </div>
                                <div>{m.text}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="p-4 bg-white rounded-b-lg border-t">
                <div className="gap-2">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}

                        className="w-full flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        rows={2}
                        placeholder="พิมพ์ข้อความของคุณ..."
                    />

                </div>
                <button
                    onClick={handleSendMsg}
                    className="w-full mt-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
                >
                    ส่ง
                </button>
            </div>
        </div>
    )
}