import { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export default function GroupChat() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('/src/components/ChatGroup/test.json');
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Ошибка загрузки чатов:', error);
        setChats([{ id: 1, messages: [] }]);
      }
    };
    fetchChats();
  }, []);

  const toggleChatSelection = (chatId) => {
    setCurrentChatId((prevChatId) => (prevChatId === chatId ? null : chatId));
  };

  const sendMessage = () => {
    if (!input.trim() || !currentChatId) return;

    const newMessage = {
      id: Date.now(),
      msgtext: input,
      msgtime: new Date().toLocaleTimeString(),
      msguser: 'Вы',
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setInput('');
  };

  const addChat = () => {
    const newChatId = chats.length + 1;
    const newChat = {
      id: newChatId,
      messages: [],
    };
    setChats([...chats, newChat]);
  };

  const removeChat = (chatId) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) setCurrentChatId(null);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        display: 'flex',
      }}
    >
      <div>
        <button
          onClick={addChat}
          style={{
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
          }}
        >
          Добавить чат
        </button>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() => toggleChatSelection(chat.id)}
                style={{
                  padding: '10px',
                  marginRight: '5px',
                  backgroundColor:
                    currentChatId === chat.id ? '#007bff' : '#ccc',
                  color: 'white',
                }}
              >
                Чат {chat.id}
              </button>
              {chat.id !== 1 && (
                <button
                  onClick={() => removeChat(chat.id)}
                  style={{
                    padding: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius:'50%'
                  }}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          style={{
            height: '400px',
            width: '600px',
            overflowY: 'auto',
            padding: '10px',
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        >
          {currentChatId ? (
            currentChat.messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: '8px',
                  backgroundColor: '#e5e5e5',
                  color: 'black',
                  borderRadius: '5px',
                  marginBottom: '5px',
                  maxWidth: ' 100px',
                }}
              >
                <strong>{msg.msguser}</strong> <small>{msg.msgtime}</small>
                <p>{msg.msgtext}</p>
              </div>
            ))
          ) : (
            <p style={{ color: '#888' }}>Выберите чат</p>
          )}
        </div>
        {currentChatId && (
          <div style={{ marginTop: '10px' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ padding: '10px', width: '80%' }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
              }}
            >
              Отправить
            </button>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ padding: '10px' }}
            >
              😀
            </button>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        )}
      </div>
    </div>
  );
}
