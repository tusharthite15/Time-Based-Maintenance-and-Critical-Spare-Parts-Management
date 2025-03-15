# Project Setup

This project consists of two parts: a React frontend and a Node.js backend.

## Folder Structure
```
/kfpl     (Frontend - React)
/new      (Backend - Node.js)
```

## Getting Started

### Prerequisites
- Node.js installed (v14 or higher recommended)
- npm (Node Package Manager) installed

---

## Frontend (React)

### Location: `kfpl`

### Installation
1. Navigate to the frontend directory:
```bash
cd kfpl
```
2. Install dependencies:
```bash
npm install
```

### Running the Frontend
To start the React application, run:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

---

## Backend (Node.js)

### Location: `new`

### Installation
1. Navigate to the backend directory:
```bash
cd new
```
2. Install dependencies:
```bash
npm install
```

### Running the Backend
To start the backend server, run:
```bash
node server.js
```
The server will be available at `http://localhost:5000` (assuming `server.js` is configured to listen on port 5000).

---

## Additional Notes
- Ensure both the frontend and backend are running simultaneously for full functionality.
- Modify the backend URL in your React app if it differs from the default setup.
- Customize the `server.js` file as needed for your backend functionality.
