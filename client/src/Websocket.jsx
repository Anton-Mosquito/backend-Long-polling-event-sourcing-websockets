import React, { useRef, useState } from 'react';
import axios from 'axios';


const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername]= useState('');


  function connect(params) {
    socket.current = new WebSocket(`ws://localhost:5000`)

    socket.current.onopen = () => {
      setConnected(true)

      const message = {
        event: 'connection',
        username,
        id: Date.now()
      }

      socket.current.send(JSON.stringify(message));
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('Socket close');
    }

    socket.current.onerror = () => {
      console.log('Socket error');
    }
  }


  const setMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message'
    }

    socket.current.send(JSON.stringify(message))
    setValue('')
  }

  if(!connected) {
    return (
      <div className="center">
      <div className="form">
          <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your name"/>
          <button onClick={connect}>Sing In</button>
      </div>
  </div>
    )
  }

  return (
    <div className='center'>
      <div>
        <div className='form'>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
          <button onClick={setMessage}>Send</button>
        </div>
        <div className="messages">
          { messages.map((message) => {
            <div key={message.id}>
              {message.event === 'connection' 
                ? <div className='connection_message'>User {message.username} connected</div>
                : <div className='message'>{message.username}. {message.message}</div>
              }
            </div>
          }) }
        </div>
      </div>
    </div>
  )
}

export default WebSock;