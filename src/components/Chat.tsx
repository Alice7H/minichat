import { FormEvent, useEffect, useState } from 'react'
import{ io, Socket } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'

interface Message { id: string,  message: string }
const myId = uuidv4()
let socket: Socket

export function Chat() {
  const item = "border rounded-full max-w-xs px-8 py-1 m-1 "
  const itemMine = "self-start border-blue-400 bg-blue-200 "
  const itemOther = "self-end border-green-400 bg-green-200 "

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    socketInitializer()

    return () => {
      socket.on('disconnect', (reason) => { console.log(`disconnected due to ${reason}`) });
    }
  }, [])

  async function socketInitializer() {
    await fetch('api/socket')
    //socket = io(':3333', { transports: ['websocket']})
    socket = io()
    socket.on('connect', () => { console.log(socket.id) })

    socket.on("receive-message", (data: Message) => {
      setMessages((preview)=> [...preview, data])
    })
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(message.trim()) {
      socket.emit('send-message', {id: myId, message })
      setMessage('')
    }
  }

  return(
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <ul className="z-10 w-full max-w-5xl flex flex-col flex-wrap font-mono text-sm lg:flex">
        {messages.map((m, index) =>
          <li className={item + (m.id == myId ? itemMine : itemOther)} key={index}>
            <span className="message">User {m.id.slice(0,5)}: {m.message}</span>
          </li>)
        }
      </ul>
      <form className='flex gap-2 w-full' onSubmit={handleFormSubmit}>
        <label htmlFor="message" hidden>Type new message</label>
        <input
          name='message'
          id='message'
          className='outline-slate-400 w-full border border-slate-500 rounded-md px-2 py-1'
          type="text"
          placeholder="Type new message here"
          value={message}
          onChange={e => setMessage(e.target.value)}
          autoComplete={"off"}
        />
        <button type='submit' className='border border-green-500 bg-green-400 hover:bg-green-500 hover:transition-all px-2 py-1 rounded-full'>Enviar</button>
      </form>
    </main>
  )
}