export const LABS = [
  {
    id: "idor-basic",
    title: "IDOR – Secret Access",
    category: "IDOR",
    difficulty: "Easy",
    points: 50,
    status: "active",

    description: `
Access another user's secret by changing the ID.
Authentication is required.
`,

    endpoints: [
      "/auth/login (guys check out /writeup, or use ur {'email': '', 'password': ''} it will give u bearer auth token, add that token in your header to access the lab)",
      "GET /labs/idor/secret/:id",
      "GET /labs/idor/my-secrets"
    ],

    hints: [
    {
      id: 1,
      text: "Notice the ID used when accessing your own secret.",
      cost: 0
    }
  ]

  },

  {
    id: "sqli-search",
    title: "SQLi – Search Injection",
    category: "SQLi",
    difficulty: "Medium",
    points: 100,
    status: "active",

    description: `
Inject SQL into the search endpoint to extract hidden data.
`,

    endpoints: [
      "/auth/login (guys check out /writeup, or use ur {'email': '', 'password': ''} it will give u bearer auth token, add that token in your header to access the lab)",
      "GET /labs/sqli/search?q="
    ],
    
    hints: [
    {
      id: 1,
      text: "Search parameters are not sanitized",
      cost: 0
    }
  ]
  
  },

  {
    id: "blackmirror",
    title: "BlackMirror",
    category: "Hard",
    difficulty: "Hard",
    points: 300,
    status: "locked",

    description: `
An automated admin bot reviews user submitted content.
The bot trusts certain request headers when deciding how to render content.
Exploit admin bot logic and extract the admin secret.
`,

    endpoints: [
      "POST /labs/hard/blackmirror/report",
      "GET /labs/hard/blackmirror/result",
      "GET /labs/hard/blackmirror/admin/secret"
    ],

     hints: [
    {
      id: 1,
      text: "The admin bot trusts headers.",
      cost: 0
    },
    {
      id: 2,
      text: "The report is rendered in an admin browser. A script running there could access protected endpoints.",
      cost: 50
    },
    {
      id: 3,
      text: "'content': '<script> fetch('/../../../../..').then(r=>r.json()).then(d=>{fetch('/labs/hard/blackmirror/capture', {method:'POST',headers:{'Content-  Type':'application/json'},body:JSON.strongify({data:d.flag})})}); </script>",
      cost: 200
    }
  ]

  },

  {
    id: "deadlock",
    title: "Deadlock",
    category: "Hard",
    difficulty: "Hard",
    points: 300,
    status: "locked",

    description: `
Trigger a race condition to open the system, Exploit timing issues to open the vault illegitimately.
`,

    endpoints: [
      "POST /labs/hard/deadlock/enter",
      "GET /labs/hard/deadlock/token",
      "POST /labs/hard/deadlock/open"
    ],

     hints: [
    {
      id: 1,
      text: "The vault checks your balance before opening.",
      cost: 0
    },
    {
      id: 2,
      text: "What happens if two identical requests reach the vault at the same time?",
      cost: 150
    }
  ]
    
  },

  {
    id: "echo",
    title: "Echo",
    category: "Hard",
    difficulty: "Hard",
    points: 350,
    status: "locked",

    description: `
Abuse reflection to extract the token, Manipulate a valid token to perform an unauthorized action.
`,

    endpoints: [
      "GET /labs/hard/echo/token",
      "POST /labs/hard/echo/perform"
    ],
  
     hints: [
    {
      id: 1,
      text: "The token returned by the server doesn’t look like a JWT.",
      cost: 0
    },
    {
      id: 2,
      text: "Try decoding token, look closely at what the server verifies when the token is used. Is every field actually protected?",
      cost: 50
    },
    {
      id: 3,
      text: "Try changing view_profile to dump_secret, then re‑encode the token.",
      cost: 150
    }

  ]
  
  },

  {
    id: "phantom",
    title: "Phantom",
    category: "Hard",
    difficulty: "Insane",
    points: 500,
    status: "locked",

    description: `
Some tasks are not processed immediately.

This system accepts user requests and processes them later using an internal worker.
The worker operates with elevated privileges and makes decisions based on the request data.

Your goal is to trick the worker into revealing sensitive information it was never meant to expose.
`,

    endpoints: [
      "POST /labs/hard/phantom/request",
      "GET /labs/hard/phantom/result"
    ],

     hints: [
    {
      id: 1,
      text: "Your request is not handled immediately. Something else processes it later.",
      cost: 0
    },
    {
      id: 2,
      text: "The worker decides what to do based on the data you send.",
      cost: 50
    },
    {
      id: 3,
      text: "Try adding an unexpected action inside the request payload. example:- {'type':'export_user', 'payload': { 'action': '****_******' }}",
      cost: 200
    }
  ]

  }

];
