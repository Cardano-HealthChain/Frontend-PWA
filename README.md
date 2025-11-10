# HealthChain: Frontend (PWA & Web Apps)

This repository contains the primary user-facing applications for the HealthChain ecosystem, built with Next.js, TypeScript, and Tailwind CSS.

[span_0](start_span)This project serves three distinct user roles as defined in the MVP plan[span_0](end_span):
1.  **[span_1](start_span)Resident PWA:** The mobile-first Progressive Web App for individual users to manage their health data[span_1](end_span).
2.  **[span_2](start_span)Clinic Web App:** A secure web portal for verified clinics to write new records and view permissions[span_2](end_span).
3.  **[span_3](start_span)Health Authority Dashboard:** A web portal for administrators to manage alerts and view community metrics[span_3](end_span).

➡️ **View the main organization page:** [Link to your GitHub Org]

---

### Technology Stack

* **Framework:** Next.js (with App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui & Lucide Icons
* **State Management:** Zustand
* **Data Fetching:** Axios
* **Cardano Integration:** @meshsdk/react (for wallet connection & DID management)
* **[span_4](start_span)[span_5](start_span)QR Code:** `react-qr-code` & `react-qr-scanner` (for VC sharing[span_4](end_span)[span_5](end_span))
* **[span_6](start_span)AI Chat:** `@chatscope/chat-ui-kit-react` (for HealthChain Assistant UI[span_6](end_span))
* **[span_7](start_span)Notifications:** Firebase (for receiving alerts[span_7](end_span))

### [span_8](start_span)Core MVP Features[span_8](end_span)

* **Resident (S-1.x):**
    * (S-1.0) User Onboarding & DID Generation
    * (S-1.1) Home Dashboard with Alert Banner
    * (S-1.3) VC Sharing via QR Code
* **Clinic (S-2.x):**
    * (S-2.2) Scan QR Code / Search Patient DID
    * (S-2.3) Write Vaccination Status Form
* **Authority (S-3.x):**
    * (S-3.1) Create Alert Panel
    * (S-3.2) MVP Community Dashboard (Simple Metrics)
* **All Roles (S-4.1):**
    * (S-4.1) AI HealthChain Assistant Chat UI

### Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd frontend-pwa
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root and add the required keys:
    ```
    # URL for the backend API service
    NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

    # Firebase keys (for push notifications)
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
