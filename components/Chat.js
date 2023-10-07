import React, { useEffect, useState } from "react";
import { ChatLine } from "./ChatLine.js";
import clsx from "clsx";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([{ role: "assistant", content: "Hi! I am an AI chat bot ready to assist you with any of your concerns. How can I help you today?" }]);
  const [isTyping, setIsTyping] = useState(false);

  async function getStart(msgs) {
    const req = await fetch("https://gpt-node-app.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chats,
      }),
    });
    const data = await req.json();
    msgs.push(data.output);
    setChats(msgs);
    setIsTyping(false);
  }

  const chat = async (e, message) => {
    try {
      e.preventDefault();

      if (!message) return;
      setIsTyping(true);

      const msgs = chats;
      msgs.push({ role: "user", content: message });
      setChats(msgs);

      setMessage("");
      getStart(msgs);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ width: "100%", border: "2px solid white", maxHeight: 450, overflowY: "scroll" }} className="rounded-2xl bg-[#1e222c] lg:p-6">
      {chats.map(({ content, role }, index) => {
        return (<ChatLine role={role} content={content} />);
      })}

      { isTyping && (
        <span className="clear-both mx-auto flex flex-grow text-gray-400">
          Typing...
        </span>
      )}

      <div className="clear-both mt-6 flex">
        <input
          type="text"
          aria-label="chat input"
          required
          placeholder="Type response here"
          className="min-w-0 text-white flex-auto appearance-none rounded-md border border-zinc-900/10 bg-[#191c1e] px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              chat(e, message);
              setMessage("");
            }
          }}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          className={clsx(
            "inline-flex items-center justify-center gap-1 rounded-md px-3 py-2 text-sm outline-offset-2 transition active:transition-none",
            "font-semibold text-zinc-100 hover:bg-zinc-400 active:bg-zinc-800 active:text-zinc-100/70 ml-2 flex-none"
          )}
          style={{ 
            background: "var(--linear-gradient)"
          }}
          type="submit"
          onClick={(e) => {
            chat(e, message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}