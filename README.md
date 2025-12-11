

# 🚀 CodeFlex AI: Personalized Fitness & Nutrition Coach

## Project Overview

CodeFlex AI is a modern, full-stack fitness application that uses an AI assistant (powered by Groq/LLaMA) to generate customized workout and diet plans through a voice conversation. It is built to be fast, secure, and fully personalized, storing all user data securely in a serverless database.

## ✨ Features

### 1\. Core Conversational Planning

  * **Voice Assistant:** Users interact with the AI coach via voice (Vapi) to define their fitness goals, body stats (age, height, weight), available workout days, and dietary restrictions.
  * **AI Generation (Groq/LLaMA):** The backend uses a specialized Large Language Model (LLM) to instantly process the conversation and output a structured, personalized **Workout Plan** and a **Diet Plan** in JSON format.
  * **Plan Persistence:** The generated plans are instantly saved to the user's profile in the database.

### 2\. User & Data Management

  * **Secure Authentication:** User login and management are handled entirely by Clerk.
  * **Automatic Deactivation:** When a new plan is created, the system automatically deactivates the user's previous active plan, ensuring only one plan is current at any time.
  * **Profile Dashboard:** Users can view, switch between, and review all their generated historical plans.

-----
-----

## 🖼️ Screenshot Gallery

| Screenshot | Description | Placeholder |
| :--- | :--- | :--- |
| **Login/Signup** | User authentication screen via Clerk. |<img width="1600" height="850" alt="image" src="https://github.com/user-attachments/assets/30d248d3-e3d8-45f0-94b4-45d45ecf36ac" />
 |
| **Voice Assistant Interface** | The main conversational screen where the user interacts with the AI. | ![WhatsApp Image 2025-12-11 at 9 06 41 PM](https://github.com/user-attachments/assets/84c07974-abf1-45a9-9e7a-5eef093b26c2)
 |
| **Profile Dashboard** | The profile page showing a list of generated plans and the active plan details. | ![WhatsApp Image 2025-12-11 at 9 06 48 PM](https://github.com/user-attachments/assets/fa473494-cb3f-4a37-9d10-0d3fac1f5ce5)
 |
| **Workout Plan View** | Detailed view of a generated workout plan (exercises, sets, reps). | <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/dc295fac-221c-435b-a722-ed54aca616af" />
 |
| **Diet Plan View** | Detailed view of a generated diet plan (calories, meals, foods). | <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/9977a86c-a397-48b3-ae09-f888ce0cf7ea" />
|

# Phone View


<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/d0be3413-d3e5-443b-a0d8-07ac3f3f2035" />


<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/778c6a99-e86c-40b3-b910-c5628b0e16f0" />

<img width="540" height="1200" alt="image" src="https://github.com/user-attachments/assets/3d0281e4-2496-4241-b307-29270e2baeb8" />


-----

## 🔒 Security Highlights

The project follows a secure, serverless architecture that prevents common vulnerabilities like SQL injection and cross-site scripting (XSS).

| Security Component | Implementation Detail | Why It's Secure |
| :--- | :--- | :--- |
| **Authentication** | **Clerk** | Handles user creation, sessions, and tokens (JWTs), ensuring passwords/sensitive login details **never touch your database or server code**. |
| **Data Integrity** | **Convex Internal ID (or Email)** | Plans are linked to the user via a **unique, immutable identifier** (the secure Clerk ID or the primary email address). This prevents plan hijacking even if names or other details change. |
| **Database Access** | **Convex Rules** | All read/write operations (Mutations/Queries) are secured by Convex's serverless functions. Users can only fetch plans that match their authenticated session ID or email address. |
| **Webhooks** | **Svix Verification** | All Clerk webhooks (for user creation/updates) are cryptographically signed and verified using the `svix` library, ensuring that only genuine messages from Clerk are processed. |

-----

## 💻 Technology Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **Next.js** (React) | Modern web framework for the user interface. |
| **Authentication** | **Clerk** | Comprehensive user management and secure session handling. |
| **Voice Interface** | **Vapi** | Orchestrates the real-time, low-latency voice conversation and connects it to the backend webhook. |
| **Database / Backend** | **Convex** | Real-time, full-stack serverless platform for storage, functions (Mutations/Queries), and secure authentication handling. |
| **AI Generation** | **Groq** (LLaMA 3.1) | Provides ultra-fast, structured responses to generate the diet and workout plans. |
| **Styling** | **Tailwind CSS / ShadCN** | Utility-first CSS framework for rapid, consistent styling. |

-----

## 🛠️ Project Setup (Local Development)

Follow these steps to get a local copy of CodeFlex AI running.

### Prerequisites

You need accounts and API keys for the following services:

  * **Clerk:** For user authentication.
  * **Convex:** For the database and backend functions.
  * **Groq:** For the LLM API (Fast AI generation).
  * **Vapi:** For the conversational voice interface.

### 1\. Clone the Repository

```bash
git clone [YOUR_REPO_URL]
cd codeflex-ai
```

### 2\. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3\. Configure Environment Variables

Create a file named `.env.local` in your project root and fill in the necessary API keys and URLs.

```bash
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://[YOUR-CLERK-SLUG].clerk.accounts.dev

# Convex App URL (find this in your Convex dashboard)
NEXT_PUBLIC_CONVEX_URL=https://[YOUR-CONVEX-SLUG].convex.cloud

# Groq API Key
GROQ_API_KEY=gsk_...

# Vapi
NEXT_PUBLIC_VAPI_PUBLIC_KEY=[YOUR-VAPI-PUBLIC-KEY]
VAPI_API_KEY=[YOUR-VAPI-SECRET-KEY]

# Clerk Webhook Secret (for Svix verification)
CLERK_WEBHOOK_SECRET=whsec_... 
```

### 4\. Configure Convex Authentication

Create a file named `convex/auth.config.js` and point it to your Clerk domain:

```javascript
// convex/auth.config.js
export default {
  providers: [
    {
      // MUST match your Clerk Frontend API URL without the trailing slash
      domain: "https://[YOUR-CLERK-SLUG].clerk.accounts.dev", 
      // MUST match the JWT Template name created in Clerk (Step 5)
      applicationID: "convex", 
    },
  ],
};
```

### 5\. Configure Clerk JWT Template

In your **Clerk Dashboard**:

  * Navigate to **JWT Templates**.
  * Create a new template named exactly **`convex`**.
  * This ensures Clerk issues the required tokens for Convex authentication.

### 6\. Start Convex and Next.js

In one terminal tab, start the Convex development server:

```bash
npx convex dev
```

In a second terminal tab, start the Next.js frontend:

```bash
npm run dev
```

Your project should now be running locally at `http://localhost:3000`.


## 🤝 Contribution

Contributions are welcome\! Please fork the repository and submit a pull request for new features or bug fixes.

-----

## © License

This project is licensed under the MIT License.


Author :
Code0era
