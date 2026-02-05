import { LABS } from "./labs.data";

export function getAuthBurpGuide() {
  return {
    id: "auth-burp",
    title: "Register & Login using Burp Suite",
    sections: [
      {
        title: "Register",
        body: [
          "Endpoint:",
          "POST /auth/register",
          "",
          "Create an account first. You must be authenticated to access labs.",
          "",
          "After registering, login to obtain either a session cookie or a token.",
        ].join("\n"),
      },
      {
        title: "Login",
        body: [
          "Endpoint:",
          "POST /auth/login",
          "",
          "After login, the server will authenticate you using either:",
          "• Cookie based session (browser will send cookie automatically)",
          "• Token based auth (you must attach it manually in Burp/Repeater)",
        ].join("\n"),
      },
      {
        title: "Using token for labs (Burp / Repeater)",
        body: [
          "If login returns a token, attach it to every lab request:",
          "",
          "Authorization: Bearer <token>",
          "",
          "Without this header (or cookie), lab endpoints will return 401/403.",
        ].join("\n"),
      },
      {
        title: "Tips",
        body: [
          "- Use Burp Proxy to capture the request",
          "- Send request to Repeater",
          "- Ensure Cookie / Authorization header is present in Repeater",
        ].join("\n"),
      },
    ],
  };
}

function easyMediumSections(lab) {
  const approach =
    lab.category === "IDOR"
      ? `
Start by using the application normally as an authenticated user.

1) Identify object references
Look for IDs in URLs, query parameters, or API responses (user IDs, UUIDs, numeric IDs).

2) Compare access patterns
Observe endpoints that return *your* data versus endpoints that return data *by ID*.
Note which parameter controls which object is fetched.

3) Test authorization enforcement
Change only the object identifier while keeping your authentication the same.
Ask whether the server verifies ownership of the requested object.

4) Validate the issue
An IDOR exists if you can access another user's data without changing who you are.

5) Confirm impact
Understand what data is exposed and why access should have been denied.

Key takeaway:
IDOR is an authorization flaw, not an authentication issue.
      `.trim()
      : lab.category === "SQLi"
      ? `
Begin by identifying inputs that influence searching, filtering, or sorting.

1) Locate database backed inputs
Search parameters are common entry points. Observe how different inputs change results.

2) Observe response behavior
Look for differences in response size, content, ordering, or error messages.

3) Test input handling
Change input values incrementally and watch how the application responds.
Behavioral differences often indicate database interaction.

4) Confirm unsanitized input
SQL injection exists if user input alters query logic instead of being treated as data.

5) Understand impact
Determine whether data exposure, logic bypass, or unauthorized access is possible.

Key takeaway:
SQL injection is about user input becoming part of query logic.
      `.trim()
      : `
Observe normal application behavior and map request flows.
Modify one input at a time and reason about server-side decisions.
      `.trim();

  return [
    {
      title: "Goal",
      body: lab.description.trim(),
    },
    {
      title: "Endpoints",
      body: (lab.endpoints || []).map((e) => `- ${e}`).join("\n"),
    },
    {
      title: "How to Approach",
      body: approach,
    },
    {
      title: "Hints (Official)",
      body: (lab.hints || [])
        .map((h) => `Hint ${h.id} (cost ${h.cost}): ${h.text}`)
        .join("\n"),
    },
    {
      title: "Fix / Takeaways",
      body:
        lab.category === "IDOR"
          ? [
              "- Enforce authorization checks on every object access.",
              "- Never trust client supplied identifiers for access control.",
              "- Centralize authorization logic on the server.",
            ].join("\n")
          : lab.category === "SQLi"
          ? [
              "- Use parameterized queries (prepared statements).",
              "- Avoid dynamic SQL string concatenation.",
              "- Constrain inputs that affect query structure.",
            ].join("\n")
          : [
              "- Validate inputs at trust boundaries.",
              "- Avoid implicit trust in internal actions.",
            ].join("\n"),
    },
  ];
}

function hardLabSections(lab) {
  return [
    { title: "Goal", body: lab.description.trim() },
    {
      title: "Hard lab note",
      body: [
        "This is an advanced lab.",
        "",
        "A step by step walkthrough is intentionally not provided here.",
        "The exact commands / payloads are already given inside the in lab hints.",
        "",
        "Use the hints progressively and reason about why each hint matters.",
      ].join("\n"),
    },
    {
      title: "Endpoints",
      body: (lab.endpoints || []).map((e) => `- ${e}`).join("\n"),
    },
    {
      title: "Where to find the solution",
      body: [
        "Open the lab inside VOID and use the hint system.",
        "The intended exploit steps are already included there.",
      ].join("\n"),
    },
  ];
}

function isPublicWriteup(lab) {
  return lab.id === "idor-basic" || lab.id === "sqli-search";
}

export function getWriteups() {
  const auth = getAuthBurpGuide();

  const publicLabs = LABS.filter(isPublicWriteup);

  const labWriteups = publicLabs.map((lab) => ({
    id: lab.id,
    title: lab.title,
    category: lab.category,
    difficulty: lab.difficulty,
    points: lab.points,
    status: lab.status,
    sections:
      lab.difficulty === "Easy" || lab.difficulty === "Medium"
        ? easyMediumSections(lab)
        : hardLabSections(lab),
  }));

  return [auth, ...labWriteups];
}

export function getWriteupById(id) {
  if (id === "auth-burp") return getAuthBurpGuide();

  const lab = LABS.find((l) => l.id === id);
  if (!lab) return null;

  return {
    id: lab.id,
    title: lab.title,
    category: lab.category,
    difficulty: lab.difficulty,
    points: lab.points,
    status: lab.status,
    sections:
      lab.difficulty === "Easy" || lab.difficulty === "Medium"
        ? easyMediumSections(lab)
        : hardLabSections(lab),
  };
}
