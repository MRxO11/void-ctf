export const AUTH_GUIDE = {
  id: "auth-guide",
  title: "How to Register, Login, and Use Token",
  sections: [
    {
      title: "Register",
      body: `
Use the following endpoint to create an account:

POST /auth/register

You must register before attempting any lab.
      `.trim(),
    },
    {
      title: "Login",
      body: `
Authenticate using:

POST /auth/login

The server will respond with either:
• A session cookie (browser-based auth)
• OR a token (API/Burp usage)
      `.trim(),
    },
    {
      title: "Using token for labs (Burp / API)",
      body: `
If login returns a token, include it in every lab request:

Authorization: Bearer <token>

Without this header, labs will fail with 401 / 403.
      `.trim(),
    },
    {
      title: "Common mistakes",
      body: `
• Forgetting to include Authorization header
• Using an expired token
• Sending lab requests without login
      `.trim(),
    },
  ],
};
