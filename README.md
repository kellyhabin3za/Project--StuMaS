StuMas – Student Marks Management System

A web-based application for managing and tracking student academic performance. Built with vanilla JavaScript, HTML, and CSS as a learning project for frontend development and DOM manipulation.

Features

Add Students – Input student name, age, and subject scores (Maths, Science, English)
Calculate Averages – Automatically compute average score for each student
Persistent Storage – All student data saved to browser localStorage
Dynamic Table Rendering – View all students in a formatted table that updates instantly
Form Validation – Comprehensive checks for name format, age range, and score validity
Delete Students – Remove student records from the system

Current Status

Core functionality is complete and working:
- Student form submission with full validation
- Table rendering that updates without page refresh
- localStorage integration for data persistence
- Clean UI with responsive styling

Next Steps

Add Chart.js visualization to display student performance analytics
Implement edit functionality to modify existing student records
Connect to a backend database (SQL) instead of localStorage
Add delete button functionality to remove individual students
Improve UI/UX with better styling and user feedback

Tech Stack

Frontend: HTML5, CSS3, Vanilla JavaScript
Storage: Browser localStorage
Fonts: Google Fonts (Bebas Neue, Playfair Display)
Icons: Font Awesome 7.0.1

How to Use

1. Click the add button to open the form
2. Fill in student details (name, age, and three subject scores)
3. Submit the form to add the student to the table
4. Data persists across browser sessions via localStorage
5. Refresh the page to see previously added students

Installation

Clone the repository
Open index.html in your browser
No dependencies or build setup required

Learning Goals

Master JavaScript DOM manipulation (createElement, appendChild, classList)
Understand event listeners and form handling
Learn localStorage for client-side data persistence
Build a complete feature from concept to working application
Prepare for full-stack development with backend integration
