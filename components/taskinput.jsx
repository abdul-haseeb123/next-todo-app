"use client";

import React, { useRef, useState } from "react";

function TaskInput() {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDateInputFocused, setIsDateInputFocused] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [taskContent, setTaskContent] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleDateInputFocus = () => {
    setIsDateInputFocused(true);
  };
  const handleDateInputBlur = () => {
    setIsDateInputFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date(dueDate);

    const res = await fetch('/api/registerTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: taskContent,
                dueDate: date
                })
            });
    const json = await res.json();
    console.log(json);


    setTaskContent("");
    setDueDate(null);
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-blue-500 min-h-[56px] mt-8 max-w-screen-xl w-11/12 mx-auto items-center gap-4">
        <button className="bg-green-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-plus-lg text-white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
        </button>
        <input
          type="text"
          className="py-4 w-full"
          placeholder="Enter Task"
          ref={inputRef}
          onFocus={handleFocus}

          name="taskContent"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />
      </div>
      {(isFocused || isDateInputFocused) && (
        <div className="flex max-w-screen-xl w-11/12 mx-auto items-center h-8 bg-purple-400 justify-between">
          <input
            type="date"
            placeholder="Enter Due Date"
            onFocus={handleDateInputFocus}
            onBlur={handleDateInputBlur}
            name="dueDate"
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="bg-green-400">Add Task</button>
        </div>
      )}
    </form>
  );
}

export default TaskInput;
