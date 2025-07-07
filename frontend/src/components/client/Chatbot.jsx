import React, { useState } from "react";
import { FiX, FiSend, FiMessageSquare } from "react-icons/fi";
import api from "../../services/axios"; // ✅ Instance personnalisée d'Axios

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const response = await api.post("/chatbot", {
        prompt: question,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Une erreur s'est produite." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-indigo-500 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-sm">Conseiller IA</span>
            <button onClick={() => setOpen(false)} className="hover:text-red-300">
              <FiX size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 scroll-smooth bg-gray-50 text-sm">
            {messages.length === 0 ? (
              <p className="text-gray-400 italic text-center mt-12">
                Pose ta question pour commencer...
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[85%] ${
                    msg.sender === "user"
                      ? "ml-auto bg-indigo-100 text-right"
                      : "bg-white border border-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 flex items-center px-3 py-2 bg-white">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Pose ta question..."
            />
            <button
              onClick={handleSend}
              className="ml-2 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
              title="Envoyer"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
        >
          <FiMessageSquare size={18} />
          Besoin d’aide ?
        </button>
      )}
    </div>
  );
};

export default Chatbot;
