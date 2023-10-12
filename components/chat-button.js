import { useState } from "react";
import Chat from "./chat";

const ChatButton = () => {
  const [open, setOpen] = useState(false);

  function toggleModal() {
    setOpen((prevOpen) => !prevOpen);
    console.log(open);
  }

  return (
    <div className="fixed bottom-0 right-0 mb-8 mr-8 flex w-1/4 flex-col">
      {open && <Chat />}
      <button
        onClick={toggleModal}
        style={{ padding:16, background: "var(--linear-gradient)" }}
    className="ml-auto mt-4 rounded-full bg-[#6248ff] text-gray-700 transition duration-300 hover:bg-[#ac51ef] dark:bg-primary text-white dark:hover:bg-secondary-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          className="m-auto"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
        </svg>
      </button>
    </div>
  );
};

export default ChatButton;