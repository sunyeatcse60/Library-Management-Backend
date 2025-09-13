# Library Management API

**Short description (English):** A simple Library Management REST API built with Node.js, Express, TypeScript and MongoDB (Mongoose). It supports creating books, listing (with filtering/sorting/limit), CRUD by id, borrowing books (with stock management), and a borrowed-books summary via aggregation.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup & Run](#setup--run)
- [Environment Variables](#environment-variables)
- [NPM Scripts](#npm-scripts)
- [API Reference](#api-reference)
  - [Books](#books)
    - `POST /api/books`
    - `GET /api/books`
    - `GET /api/books/:id`
    - `PUT /api/books/:id`
    - `DELETE /api/books/:id`
  - [Borrow](#borrow)
    - `POST /api/borrow`
    - `GET /api/borrow`
- [Models / Interfaces](#models--interfaces)
- [Business Logic Notes](#business-logic-notes)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- npm / yarn

---

## Features

- Create a book
- Get all books with optional `filter` (genre), `sortBy`, `sort` (asc|desc), `limit`
- Get / Update / Delete a book by id
- Borrow a book (decrements copies, sets `available = false` when copies hits 0)
- Aggregated summary of borrowed books (total quantity per book with title & isbn)

---

## Prerequisites

- Node.js v16+ (recommended)
- npm v8+ or yarn
- MongoDB (local or cloud Atlas)

---

## Project Structure (example)

```
/src
  /books
    books.interface.ts
    books.model.ts
    books.controller.ts
    books.routes.ts
  /borrow
    borrow.interface.ts
    borrow.model.ts
    borrow.controller.ts
    borrow.routes.ts
  server.ts
  app.ts

package.json
tsconfig.json
README.md
```

---

## Setup & Run

1. Clone the repo:
```bash
git clone <your-repo-url>
cd your-repo
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create `.env` file in project root (see [Environment Variables](#environment-variables)).

4. Build (if you compile TypeScript) and start:
```bash
# If you use ts-node for development
npm run dev

# If you compile to JS and run
npm run build
npm start
```

---

## Environment Variables

Create a `.env` with at least:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/myLibrary
```

---

## NPM Scripts (suggested in package.json)

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

---

