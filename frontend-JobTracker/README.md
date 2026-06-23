# 🎯 Internship Tracker — Frontend

A modern, responsive web application for tracking internship and job applications — built with **React** and **Vite**. Visualize your entire job hunt pipeline, manage applications, upload resumes, and stay on top of every opportunity.

🌐 **Live Demo**: [https://internshiptrackers.netlify.app/](https://internshiptrackers.netlify.app/)

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React (Vite) |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Styling | CSS / Custom Styles |
| Icons | Font Awesome |
| Deployment | Netlify |

---

## ✨ Features

- 📋 **Job Application Tracking** — Add, view, update and delete job/internship applications
- 🗂️ **Pipeline View** — Visualize all applications across hiring stages (Applied → Interview → Shortlisted → Offer)
- 📄 **Resume Management** — Upload, view, and download resumes stored as PDF; delete resume from an application
- 🔍 **Filter by Status** — Quickly filter applications by their current stage
- 📊 **Status Glance / Dashboard** — At-a-glance summary of application counts per status
- 📝 **Application Form** — Add new job applications with all relevant details
- 🃏 **Job Cards** — Clean card-based UI for each application showing key info
- 🧭 **Sidebar Navigation** — Easy navigation across all views

---

## 📁 Project Structure

```
frontend-JobTracker/
├── src/
│   ├── Components/
│   │   ├── Cards/
│   │   │   ├── JobCard.jsx         # Individual job application card
│   │   │   └── EmptyCard.jsx       # Empty state component
│   │   ├── Home.jsx                # Home / landing view
│   │   ├── SideBar.jsx             # Navigation sidebar
│   │   ├── Form.jsx                # Add new application form
│   │   ├── Pipline.jsx             # Pipeline / kanban view
│   │   ├── ListOfApplications.jsx  # Full list view of applications
│   │   └── StausGlance.jsx         # Dashboard / status summary
│   ├── Services/
│   │   └── Api.js                  # Axios API calls to backend
│   ├── App.jsx                     # Root component & routing
│   ├── App.css                     # Global styles
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Base CSS styles
├── public/
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running (see [Backend Repo](https://github.com/PrasannaK-27/Internship Tracker-Backend-Api))

### 1. Clone the repository
```bash
git clone https://github.com/PrasannaK-27/Internship Tracker-Frontend.git
cd Internship Tracker-Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the backend API URL
In `src/Services/Api.js`, update the base URL to point to your local or deployed backend:
```js
const API_BASE_URL = "http://localhost:8080"; // or your deployed backend URL
```

### 4. Run the development server
```bash
npm run dev
```
The app will start at `http://localhost:5173`

### 5. Build for production
```bash
npm run build
```

---

## 🔗 Backend API

This frontend connects to the **Internship Tracker Backend API** for all data operations.

- **Backend Repo**: [Internship Tracker-Backend-Api](https://github.com/PrasannaK-27/Internship Tracker-Backend-Api)
- **Key endpoints used**: `jobs`, `/resume/view/{filename}`, `/resume/download/{filename}`, `/DelResumeUrl/{id}`

---

## 🌐 Deployment

Deployed on **Netlify** with automatic builds from the `main` branch.

Live URL: [https://internshiptrackers.netlify.app/](https://internshiptrackers.netlify.app/)

