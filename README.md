# 📝 Task Board App

A simple Kanban board built with **Next.js**, **Redux Toolkit**, and **Tailwind CSS**.

---

🌐 **Live Demo:**  
[http://task-board-app-opal.vercel.app/](http://task-board-app-opal.vercel.app/)

---

## 🚀 Setup Instructions

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

```
src/
  components/    # UI components (TaskBoard, TaskCard, etc)
  store/         # Redux slices & store setup
  types/         # TypeScript types
  utils/         # Utility functions
```

---

## ⚙️ Tech & Approach

- **State Management:**  
  [Redux Toolkit](https://redux-toolkit.js.org/) for tasks and modal state.
- **Persistence:**  
  [redux-persist](https://github.com/rt2zz/redux-persist) saves tasks to local storage.
- **UI:**  
  [Tailwind CSS](https://tailwindcss.com/) for fast, responsive styling.
- **Modal & Detail:**  
  Modal state (open/close & selected task) is managed in Redux (`modalSlice`).
- **Drag & Drop:**  
  Native HTML5 drag & drop (desktop only).

---

## 📦 Features

- Add, edit, delete, and move tasks between columns.
- Change task priority (Low, Medium, High).
- View and edit task details in a modal.
- Data persists after refresh.

---

## ⚠️ Known Issues

- **Drag & drop does not work on mobile view** (only works on desktop).
- UI on very small screens may not be optimal.

---

## 💡 Improvements (If More Time)

- Implement drag & drop that supports mobile (e.g., dnd-kit).
- Task search & filter features.
- User authentication & multi-user support.
- Better accessibility (keyboard, ARIA).
- Unit & integration tests.
- Improved mobile UI.

---

Enjoy!
