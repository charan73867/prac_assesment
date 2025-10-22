Task Manager Web Application

Author: Kunda Sai Charan
Phone: 7386742005

Project Overview

This is a Task Manager Web Application built using Next.js 15, React, TypeScript, and MongoDB. The application allows users to create, update, delete, and filter tasks with a responsive and user-friendly interface. It demonstrates modern web development practices including API routes, dynamic rendering, client-server interaction, and proper error handling.

Features

Add New Tasks: Users can add tasks with a title, description, due date, and status (pending or completed).

Update Tasks: Toggle the status of tasks between pending and completed.

Delete Tasks: Remove tasks individually.

Filter Tasks: Filter tasks by all, completed, or pending.

Responsive UI: Works seamlessly across mobile, tablet, and desktop devices.

Real-time Updates: Tasks list updates automatically after add, delete, or update operations.

Loading States: Displays a spinner while fetching tasks for a smooth user experience.

Tech Stack

Frontend: Next.js 15, React, TypeScript, Tailwind CSS

Backend / API: Next.js API Routes, MongoDB

Database: MongoDB (Atlas Cloud)

Version Control: Git, GitHub


#FILE STRUCTURE#
apps/web/
│
├─ app/
│  ├─ api/
│  │  └─ tasks/
│  │     └─ [id]/route.ts    # Task API routes: DELETE, PATCH
│  ├─ components/
│  │  ├─ TaskManager.tsx     # Main Task Manager component
│  │  ├─ TaskCard.tsx        # Individual task card component
│  │  └─ AddTaskModal.tsx    # Modal for adding new tasks
│  ├─ page.tsx               # Main dashboard page
│
├─ lib/
│  └─ mongodb.ts             # MongoDB client connection
│
├─ package.json
└─ README.md

API Endpoints

GET /api/tasks - Fetch all tasks.

POST /api/tasks - Add a new task.

PATCH /api/tasks/:id - Update a task's status.

DELETE /api/tasks/:id - Delete a task.

Note: All API endpoints return JSON responses and proper HTTP status codes.

Installation & Setup

Clone the repository

git clone <your-repo-url>
cd <repository-folder>


Install dependencies

pnpm install
# or npm install


Setup MongoDB

Create a MongoDB Atlas cluster and get your connection string. Update it in lib/mongodb.ts:

const uri = "YOUR_MONGODB_CONNECTION_STRING";


Run the application

pnpm dev
# or npm run dev


Open http://localhost:3000
 in your browser.

How to Use

Add a Task: Click Add New Task, fill the form, and submit.

Toggle Status: Click on a task's status button to mark as completed or pending.

Delete Task: Click the delete button on a task card to remove it.

Filter Tasks: Use the filter buttons at the top to view all/completed/pending tasks.

Screenshots

(Add screenshots of your app here if possible for better presentation.)

Key Highlights

Handles async operations properly with await in Next.js 15.

No TypeScript errors such as 'result' is possibly 'null' due to proper null checks.

Responsive design with Tailwind CSS gradients, shadows, and hover effects.

Clean, modular code structure with reusable components.


"SCREENSHOTS"
<img width="1895" height="921" alt="image" src="https://github.com/user-attachments/assets/44e0883b-b020-431b-9907-ecdb119698c9" />
<img width="1893" height="918" alt="image" src="https://github.com/user-attachments/assets/a91a21b9-1532-4a6b-b6b5-264fdd2c4ef7" />
<img width="1873" height="922" alt="image" src="https://github.com/user-attachments/assets/ebf033fc-c55b-41be-bf99-87508bc55e2f" />


