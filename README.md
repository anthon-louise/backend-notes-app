# 📝 Notes App API

Welcome to the **Notes App API**!  
This project helps users create folders and notes, while also giving admins control over user and note management. It's built for practice and learning. 🚀

---

## 📦 Entity Relationship Diagram (ERD)

### 🧑 Users
- `id` (Primary Key)
- `username`
- `password`
- `role`: `user`

### 🛡️ Admins
- `id` (Primary Key)
- `username`
- `password`
- `role`: `admin`

### 📂 Folders
- `id` (Primary Key)
- `name`
- `user_id` (Foreign Key → Users)

### 📝 Notes
- `id` (Primary Key)
- `title`
- `content`
- `created_at`
- `user_id` (Foreign Key → Users)
- `folder_id` (Foreign Key → Folders)

---

## 🌐 API Routes

### 👤 User Routes

| Method | Route           | Description      | Sample Body |
|--------|------------------|------------------|--------------|
| POST   | `/user/register` | Create account   | `{ "username": "sampleName", "password": "samplePass" }` |
| POST   | `/user/login`    | Login account    | `{ "username": "sampleName", "password": "samplePass" }` |
| POST   | `/user/logout`   | Logout account   | _No body_ |

---

### 🛡️ Admin Routes

| Method | Route                  | Description                     | Sample Body |
|--------|------------------------|---------------------------------|--------------|
| POST   | `/admin/register`      | Create admin account            | `{ "username": "sampleName", "password": "samplePass" }` |
| POST   | `/admin/login`         | Login admin account             | `{ "username": "sampleName", "password": "samplePass" }` |
| POST   | `/admin/logout`        | Logout admin account            | _No body_ |
| GET    | `/admin/view/users`    | See all users                   | _No body_ |
| GET    | `/admin/view/notes`    | View all usernames with notes   | _No body_ |
| DELETE | `/admin/remove/user/:id` | Remove a user by ID           | _No body_ |
| DELETE | `/admin/remove/note/:id` | Remove a note by ID           | _No body_ |

---

### 📁 Folder Routes

| Method | Route             | Description           | Sample Body |
|--------|-------------------|-----------------------|--------------|
| GET    | `/folders`        | Get all folders       | _No body_ |
| GET    | `/folders/:id`    | Get folder + notes    | _No body_ |
| POST   | `/folders`        | Create a folder       | `{ "name": "sampleName" }` |
| PUT    | `/folders/:id`    | Update folder name    | `{ "name": "updatedName" }` |
| DELETE | `/folders/:id`    | Delete a folder       | _No body_ |

---

### 📝 Notes Routes

| Method | Route           | Description        | Sample Body |
|--------|------------------|--------------------|--------------|
| GET    | `/notes`         | Get all notes      | _No body_ |
| GET    | `/notes/:id`     | Get a specific note| _No body_ |
| POST   | `/notes`         | Create a note      | `{ "title": "sampleTitle", "content": "sampleContent", "folderId": "sampleId" }` |
| PUT    | `/notes/:id`     | Update a note      | `{ "title": "updatedTitle", "content": "updatedContent" }` |
| DELETE | `/notes/:id`     | Delete a note      | _No body_ |

---
