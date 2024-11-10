# Chitkara Connect

Chitkara Connect is a student portal designed for Chitkara University students, allowing them to log in with their roll numbers and passwords to access personalized information. The app uses Node.js and Express on the backend for handling requests and MongoDB as the database to store student information. The frontend is built with React, providing a user-friendly interface for students to log in and view their details.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The main purpose of this project is to enable Chitkara University students to log in securely with their roll number and password, view their personal information, and ensure data integrity with a MongoDB-backed database.

## Features

- **Student Login**: Allows students to log in using their roll number and password.
- **View Profile**: Once logged in, students can view their basic profile details.
- **Responsive Design**: The application is accessible on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TailwindCSS (for styling)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other**: Environment configuration with `dotenv`

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** set up locally or a connection URI to MongoDB Atlas.
- **Git** (optional, for cloning the repository).

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/JatinJaglan347/Chitkara-Connect.git
    cd chitkara-connect
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

4. Navigate to the frontend (React) project directory and start it:

    ```bash
    cd client
    npm start
    ```

The application should now be running locally at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for bug fixes, improvements, or suggestions.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
