import { useState, useEffect, useRef } from 'react';

const ChatArea = () => {
  // Initial messages with a user-bot conversation
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
    { id: 2, text: "I'm feeling a bit stressed out.", sender: 'user' },
    {
      id: 3,
      text: "I'm here to help! Take a deep breath and let's talk.",
      sender: 'bot',
    },
  ]);

  // State to handle the input value
  const [input, setInput] = useState('');

  // Ref for the messages container to auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to handle message sending
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
      };

      // Add the user's message
      setMessages(prevMessages => [...prevMessages, userMessage]);

      // Simulate a bot response after a delay
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: "I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.I'm here to help! Take a deep breath and let's talk.",
          sender: 'bot',
        };

        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000); // Bot responds after 1 second

      setInput(''); // Clear the input field
    }
  };

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-area-container w-full mx-auto mt-8 mb-30 md:p-4  rounded-lg flex flex-col ">
      {/* Chat Messages */}
      <div className="chat-messages flex-1 pr-1 text-white md:p-2 mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message p-3 mb-2 rounded-lg ${
              message.sender === 'user'
                ? ' 0 ml-auto bg-[#323232d9] p-2 w-fit max-w-[90%] md:max-w-[75%]'
                : ' max-[calc(100%+48px)] -ml-12 md:ml-0 '
            }`}
            style={{
              wordWrap: 'break-word',
            }}
          >
            <p>{message.text}</p>
          </div>
        ))}
        {/* Scroll target to ensure auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div>
        <form
          className="chat-input bg-[#323232d9] fixed w-[90vw] md:w-1/2 bottom-10 flex items-center gap-2 mt-auto p-2 md:p-8  backdrop-blur-xl rounded-full shadow-sm"
          onSubmit={sendMessage}
        >
          <input
            type="text"
            className="w-full p-3 rounded-lg border text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-black cursor-pointer font-semibold hover:bg-[#ffffffc9] p-3 rounded-lg   focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
