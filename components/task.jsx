"use client";

import React, { useState, useEffect } from "react";
import { Tooltip, input } from "@material-tailwind/react";
import TaskDrawer from "./taskDrawer";
import * as Dialog from "@radix-ui/react-dialog";

function Task({ task }) {
  const [important, setImportant] = useState(task.important);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [taskContent, setTaskContent] = useState(task.content);
  const [showTask, setShowtask] = useState(false);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [category, setCategory] = useState(task.category);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleTaskContent = (e) => {
    setTaskContent(e.target.value);
  };

  const handleImportant = () => {
    setImportant(!important);
  };

  const handleTaskStatus = () => {
    setTaskStatus(taskStatus === "Completed" ? "In Progress" : "Completed");
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const updateDueDate = async () => {
      const res = await fetch(`/api/tasks/${task._id}/updateDueDate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dueDate: dueDate,
        }),
      });
      const json = await res.json();
      // console.log(json);
    };
    updateDueDate();
  }, [dueDate]);

  useEffect(() => {
    const updateTaskContent = async () => {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: taskContent,
        }),
      });
      const json = await res.json();
      console.log(json);
    };
    updateTaskContent();
  }, [taskContent]);

  const checkDueDate = () => {
    if (dueDate) {
      const date = new Date(dueDate);
      const today = new Date();
      if (date < today) {
        return true;
      }
    }
    return false;
  };

  const categoryColor = (color) => {
    switch (color) {
      case "Blue":
        return "text-blue-500";
      case "Green":
        return "text-green-500";
      case "Orange":
        return "text-orange-500";
      case "Purple":
        return "text-purple-500";
      case "Red":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const categoryFillColor = (color) => {
    switch (color) {
      case "Blue":
        return "fill-blue-500";
      case "Green":
        return "fill-green-500";
      case "Orange":
        return "fill-orange-500";
      case "Purple":
        return "fill-purple-500";
      case "Red":
        return "fill-red-500";
      default:
        return "fill-gray-500";
    }
  };

  useEffect(() => {
    const updateCategory = async () => {
      const res = await fetch(`/api/tasks/${task._id}/updateCategory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
        }),
      });
      const json = await res.json();
      // console.log(json);
    };
    updateCategory();
  }, [category]);

  useEffect(() => {
    const updateStatus = async () => {
      const res = await fetch(`/api/tasks/${task._id}/updateStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: taskStatus,
        }),
      });
      const json = await res.json();
      console.log(json);
    };
    updateStatus();
  }, [taskStatus]);

  useEffect(() => {
    const updateImportant = async () => {
      // console.log(important);
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          important: String(important),
        }),
      });

      const json = await res.json();
      // console.log(json);
    };
    updateImportant();
  }, [important]);

  return (
    <Dialog.Root open={showTask} onOpenChange={setShowtask}>
      <Dialog.Trigger asChild>
        <div
          className={`flex justify-between items-center max-w-screen-xl ${
            taskStatus === "Completed" ? "w-full" : "w-11/12"
          } px-3 py-[0.85rem] mx-auto ${
            showTask == true ? "bg-gray-300" : "bg-gray-50"
          } rounded-lg my-5 hover:bg-gray-100   hover:cursor-pointer hover:shadow-lg`}
        >
          <div className="flex gap-4 items-center">
            <Tooltip
              content={
                taskStatus === "Completed"
                  ? "Mark Task In Progress"
                  : "Mark Task As Completed"
              }
            >
              <input
                id="default-checkbox"
                type="checkbox"
                value={taskStatus}
                onChange={handleTaskStatus}
                checked={taskStatus === "Completed"}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded hover:cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </Tooltip>
            <div
              className={`${taskStatus === "Completed" ? "line-through" : ""}`}
            >
              {taskContent}
            </div>
            {task.dueDate && (
              <div
                className={`text-gray-500 text-sm ${
                  checkDueDate() === true ? "text-red-600" : ""
                }`}
              >
                {" "}
                {(checkDueDate() === true ? "Overdue " : "") +
                  formatDate(dueDate)}
              </div>
            )}
            {category && (
              <div
                className={`px-3 py-1 text-sm flex gap-1 items-center ${categoryColor(
                  category
                )}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  className={`bi bi-circle-fill ${categoryFillColor(category)}`}
                  viewBox="0 0 12 12"
                  // className={`bi bi-circle-fill fill-${category.toLowerCase()}-500`}
                >
                  <circle cx="6" cy="6" r="6" />
                </svg>
                {category}
              </div>
            )}
          </div>
          <div>
            <Tooltip
              content={
                important ? "Remove Importance" : "Mark Task as important"
              }
            >
              <button onClick={handleImportant}>
                {important ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 18 18"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 18 18"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
                )}
              </button>
            </Tooltip>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow bg-blue-gray-50 fixed top-0 right-0 h-screen min-w-[300px] shadow-2xl shadow-white rounded-xl">
          <div className="flex gap-2 flex-col p-4">
            <div className="flex justify-between bg-white p-4 rounded-lg group hover:bg-gray-50 shadow-lg">
              <div className="flex gap-2 items-center">
                <Tooltip
                  content={
                    taskStatus === "Completed"
                      ? "Mark Task In Progress"
                      : "Mark Task As Completed"
                  }
                >
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value={taskStatus}
                    onChange={handleTaskStatus}
                    checked={taskStatus === "Completed"}
                    className="w-4 h-4 text-blue-600 bg-gray-100 group-hover:bg-gray-50 placeholder:bg-inherit border-gray-300 rounded hover:cursor-pointer focus:ring-blue-500 "
                  />
                </Tooltip>
                <input
                  type="text"
                  className={`${
                    taskStatus === "Completed" ? "line-through" : ""
                  } font-semibold text-gray-900 focus:border-0 focus:outline-none group-hover:bg-gray-50 `}
                  placeholder="Enter Task Content"
                  value={taskContent}
                  onChange={handleTaskContent}
                />
              </div>
              <button onClick={handleImportant}>
                {important ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-star-fill"
                    viewBox="0 0 18 18"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-star"
                    viewBox="0 0 18 18"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
                )}
              </button>
            </div>
            {dueDate && (
              <div
                className={`bg-white p-4 hover:bg-gray-50 rounded-lg shadow-lg ${
                  checkDueDate() === true ? "text-red-600" : ""
                }`}
              >
                {(checkDueDate() === true ? "Overdue " : "") +
                  formatDate(dueDate)}
              </div>
            )}
            <div className="bg-white p-4 group hover:bg-gray-50 rounded-lg shadow-lg">
              <input
                type="date"
                value={dueDate}
                className="group-hover:bg-gray-50"
                onChange={handleDueDate}
              />
            </div>
            <div className="bg-white  group hover:bg-gray-50 rounded-lg shadow-lg">
              {/* create a category picker in tailwindcss, options are blue, green, orange, purple and red */}
              <select
                className="w-full h-10 pl-3 pr-6 text-base group-hover:bg-gray-50 cursor-pointer placeholder-gray-600 shadow-md shadow-blue-gray-100 rounded-lg appearance-none focus:outline-none"
                value={category}
                onChange={handleCategory}
              >
                <option value="Blue" className="text-blue-500">
                  Blue
                </option>
                <option value="Green" className="text-green-500">
                  Green
                </option>
                <option value="Orange" className="text-orange-500">
                  Orange
                </option>
                <option value="Purple" className="text-purple-500">
                  Purple
                </option>
                <option value="Red" className="text-red-500">
                  Red
                </option>
              </select>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Task;
