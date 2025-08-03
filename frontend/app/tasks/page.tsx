'use client';

import { useState } from 'react';
import axios from 'axios';
import { SendHorizonal, Bot, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your CityConnect AI Assistant. I can help you with reporting issues, finding city services, answering questions about local programs, and navigating our platform. How can I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { message: input });
      const botReply = res.data.reply;
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong. Try again later.' }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-800 mb-4">
        <Bot className="text-blue-600" /> CityConnect AI Assistant <Sparkles className="text-pink-500" />
      </h1>
      <p className="text-gray-600 mb-8">Get instant help with city services, reporting issues, and platform navigation</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg p-4 shadow-md w-full md:w-1/4 h-fit">
          <h2 className="font-semibold text-lg text-blue-700 mb-4">💡 Quick Questions</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>How do I report a pothole?</li>
            <li>What are the recycling guidelines?</li>
            <li>When is the next community event?</li>
            <li>How do I check my EcoCoins balance?</li>
            <li>What city services are available?</li>
            <li>How can I contact my local representative?</li>
          </ul>
        </div>

        {/* Chat Window */}
        <div className="bg-white flex-1 rounded-lg shadow-md p-4 flex flex-col justify-between">
          <div className="overflow-y-auto flex-1 mb-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-lg p-3 rounded-md text-sm ${
                  msg.sender === 'bot' ? 'bg-blue-100 text-blue-800 self-start' : 'bg-gray-200 text-gray-800 self-end'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-blue-600 animate-pulse">Typing...</div>
            )}
          </div>

          <div className="flex items-center border-t pt-4 gap-2">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 border rounded-lg px-3 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} className="px-4 py-2">
              <SendHorizonal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
