# LearnHub – Online Learning Platform

A simple, responsive college mini-project built with **React JS, HTML, CSS, JavaScript, Bootstrap 5 and React Router**.

## Features
- Login page and registration page
- Home page with hero section and popular courses
- Courses page with search and category filters
- Individual course details page
- Video lesson page with embedded YouTube player
- Responsive navigation and layout
- Demo account stored in browser `localStorage`

## Run the project
1. Install **Node.js** (LTS version).
2. Extract this project folder.
3. Open a terminal in the project folder.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local address printed by Vite (usually `http://localhost:5173`).

To create a production build, run `npm run build`.

## Demo usage
- Open **Register**, create an account using a sample name, email and password (minimum 6 characters).
- You will be logged in and returned to the home page.
- Browse courses → open a course → click **Start learning** to open the video page.
- Log out and use the same email/password on the login page.

## YouTube video
The course player uses YouTube embed links from the sample course data in `src/data.js`. YouTube videos may vary in duration and availability, and some owners disable embedding. To use a specific one-hour video, replace the `videoId` value with the ID from its YouTube URL. For example, for `https://www.youtube.com/watch?v=VIDEO_ID`, set `videoId: 'VIDEO_ID'`.

## Important project note
This is a front-end academic demonstration, not production authentication. Account details are stored in browser localStorage; passwords are not securely protected. A real platform needs a backend, database, secure password hashing and proper user authentication.

## Project structure
```
learnhub-online-learning/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── data.js
    ├── main.jsx
    └── styles.css
```
