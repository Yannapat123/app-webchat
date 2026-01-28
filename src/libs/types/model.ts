
export type Items = {
    text: string
    from: string
    createdAt: number
}
export type Message = {
    text: string
    from: 'line-oa' | 'web'
    userId: string
    createdAt: number
}