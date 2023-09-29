// ResumeBuilder.js
/*
  File: ResumeBuilder.js
  Author: Your Name
  Date: September 20, 2023
  Description: This file contains the React component for a Resume Builder application.
*/

import React, { useState } from 'react';

function ResumeBuilder() {
  const [sections, setSections] = useState([
    { id: 'experience1', content: 'Experience Placeholder' },
    { id: 'education1', content: 'Education Placeholder' },
    { id: 'skill1', content: 'Skill Placeholder' },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
  e.preventDefault();
  const sectionId = e.dataTransfer.getData('text/plain');
  const sectionIndex = sections.findIndex((section) => section.id === sectionId);

  if (sectionIndex === -1) {
    return; //Using Early exit-if, incase the section is not found
  }

  const updatedSections = [...sections];
  const [movedSection] = updatedSections.splice(sectionIndex, 1);
  updatedSections.splice(e.currentTarget.dataset.index, 0, movedSection);

  setSections(updatedSections);
  updateSectionOrder(updatedSections.map((section) => section.id));
};

  const updateSectionOrder = (sectionOrder) => {
  // This part of the code is responsible for sending an HTTP POST request to the server to update the order of sections, and it handles the server's response.
  fetch('/resume/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_order: sectionOrder }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update section order. Please try again later.');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Handle the server response as needed
    })
    .catch((error) => {
      console.error('There has been a network or server error. Please try again later.', error);
      alert(error.message); // Show a user-friendly error message
    });
};


  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <ul
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {sections
            .filter((section) => section.id.startsWith('experience'))
            .map((section, index) => (
              <li
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                data-index={index}
              >
                {section.content}
              </li>
            ))}
        </ul>
        <button>Add Experience</button>
        <br />
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <ul onDragOver={handleDragOver} onDrop={handleDrop}>
          {sections
            .filter((section) => section.id.startsWith('education'))
            .map((section, index) => (
              <li
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                data-index={index}
              >
                {section.content}
              </li>
            ))}
        </ul>
        <button>Add Education</button>
        <br />
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <ul onDragOver={handleDragOver} onDrop={handleDrop}>
          {sections
            .filter((section) => section.id.startsWith('skill'))
            .map((section, index) => (
              <li
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                data-index={index}
              >
                {section.content}
              </li>
            ))}
        </ul>
        <button>Add Skill</button>
        <br />
      </div>
      <br />
      <button>Export</button>
    </div>
  );
}

export default ResumeBuilder;
