# 🔥 Firebase setup

### Authentication providers:

1. Go to [Firebase console](https://console.firebase.google.com/) and create a project.

2. **Authentication** -> **Sign-in methods**: enable `Email/Password` and `Google` sign-in providers.

3. **Authentication** -> **Settings** -> **Add domain**: add `localhost` to allowed domains.

4. **Authentication** -> **Templates** -> **Password reset** -> **Customize action URL**: add `http://localhost:3000`.

### Firestore database setup:

1. Create database with `production mode`.

### Firebase application setup:

1. **Project settings** -> **General**: create a new web-application.

2. **Project settings** -> **Service account** -> **Generate new private key**.

3. In the project folder, you can see `env.example` file, rename it to `.env`.

4. Copy and paste your **SDK configuration** and **Service account** variables to `.env` file.

**Notice**: variables prefixed as `NEXT_PUBLIC` are **public** and automatically exposed to the browser, otherwise variables are **private** and used for the server-side.
Private variables secured by Next.js framework. Make sure you added the `.env` file to `.gitignore`.
