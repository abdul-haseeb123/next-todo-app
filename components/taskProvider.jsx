"use client";
import React, { useState, useEffect } from "react";
import TaskNavbar from "./taskNavbar";
import TaskInput from "./taskinput";
import Task from "./task";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


export default function TaskProvider() {
  const [sharedTasks, setSharedTasks] = useState([]);
  const [accordionOpen, setAccordionOpen] = useState(0);


  const handleDataUpdate = (newData) => {
    setSharedTasks(newData);
  };

  const handleAccordionOpen = (value) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };


  return (
    <div className="bg-gray-200">
      <TaskNavbar
        handleDataUpdate={handleDataUpdate}
        sharedTasks={sharedTasks}
      />
      <TaskInput />
      <ul>
        {sharedTasks.filter(task => task.status === "In Progress").map((task) => (
          // <li key={task._id}>{task.content}</li>
          <Task key={task._id} task={task} />
        ))}
      </ul>
      <Accordion open={accordionOpen === 1} className="max-w-screen-xl w-11/12 mx-auto">
        <AccordionHeader  onClick={() => handleAccordionOpen(1)}>
          <h4 className="text-gray-600 text-lg">Completed Tasks</h4>
        </AccordionHeader>
        <AccordionBody>
          <ul>
            {sharedTasks.filter(task => task.status === "Completed").map((task) => (
              // <li key={task._id}>{task.content}</li>
              <Task key={task._id} task={task}   />
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

    </div>
  );
}
