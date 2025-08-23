# SwitchMFB - Core Banking Customer Account Dashboard

## A secure, responsive, and performant Core Banking Customer Account Dashboard built with React, Redux Toolkit, and Tailwind CSS. This application provides users with a clean interface to log in, view their personal profile, manage various accounts, and track recent transactions, as well as initiate payments and transfers.

### Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Architectural Decisions](#architectural-decisions)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Login Credentials](#login-credentials)
- [Screenshots](#screenshots)

---

### Project Overview

SwitchMFB is a single-page application designed as a frontend for a new Core Banking web application. It simulates a modern banking dashboard, allowing users to interact with secured backend APIs (secured with OAuth 2.0). The application features a simple and secure login interface, followed by a protected dashboard where users can view their profile, manage different account types (Savings, Current, Loan), interact with a dynamic transaction history, and perform funds transfers. The project emphasizes robust state management, a clean, maintainable folder structure, and a highly responsive user experience.

### Key Features

- **Secure User Authentication:** A dedicated login page with protected routes, ensuring only authenticated users can access the dashboard. Integrates OAuth 2.0 authentication (mocked for this assessment).
- **Account Overview Page:** Displays a summary of various account types (Savings, Current, Loan), masked account numbers (last 4 digits visible), current balance with currency formatting, and last transaction date. Includes filtering by account type and sorting by balance and last transaction date.
- **Profile Information:** A dedicated section to display the user's personal details.
- **Dynamic Transaction History:** On clicking an account, users are navigated to /accounts/:id/transactions. It displays a list of transactions including date, description, debit/credit indicator (color-coded), amount, and balance after transaction. Features pagination/infinite scroll, advanced filtering, and export to CSV.

- **Funds Transfer Module:** Accessible from account details, this module allows users to initiate transfers via a form with source account dropdown, beneficiary account number (with validation), amount, and description. It includes a confirmation modal and handles POST requests to /api/transfers.
- **Global Loading State:** A centralized state management for loading indicators across different parts of the application.
- **Responsive Design:** The layout is fully responsive, providing a consistent experience across various devices and screen sizes.

### Architectural Decisions

1.  **Separation of Concerns (Folder Structure):**
    The project is organized with a clear separation of responsibilities to ensure a clean and scalable codebase.

    - **`pages/`**: Contains top-level components that represent a full page or a specific route (`Login.jsx`, `Dashboard.jsx`, `TransactionPage.jsx`, `TransfersPage.jsx`,` LandingPage.jsx`).
    - **`components/`**: Houses reusable UI components, further organized by domain (`accounts`, `profile`, `transactions`) and type (`layout`, `common`). This prevents a large, unorganized folder and makes components easy to find.
    - **`features/`**: Dedicated to Redux slices (`authSlice`, `accountsSlice`, `loaderSlice`, `profileSlice`, `sessionSlice`, `transactionsSlice`, `transfersSlice`), centralizing all application state management logic in one place. This strictly adheres to the Redux Toolkit pattern.
    - **`routes/`**: Contains the `ProtectedRoute.jsx` component, separating route-related logic from the UI components.

2.  **State Management with Redux Toolkit:**
    Redux Toolkit (RTK) was chosen to provide a predictable state container for the application. `createSlice` was used to simplify Redux boilerplate. A dedicated `loaderSlice` was implemented to manage the loading state for all data fetching operations, allowing for a consistent user experience with minimal code repetition.

3.  **UI Development with Tailwind CSS:**
    Tailwind CSS was used for styling to enable rapid UI development. Its utility-first approach allowed for building complex layouts and components directly in the JSX, ensuring a consistent design system and making the application easy to style and maintain.

4.  **Decoupled Frontend and Backend:**
    A mock API (`mockApi.js`) was implemented to simulate backend data fetching. This decision allowed the frontend development to proceed independently, demonstrating a clean architecture that can be easily connected to a real backend API in the future.

### Technologies Used

- **Frontend:** React, React Router
- **State Management:** Redux Toolkit, React-Redux
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Axios Mock Adapter:** Mock API
- **Axios:** For Fetching API
- **Heroicons:** For scalable vector icons.

### Setup and Installation

Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yaqubadesola/switch_assessment_2.git
    cd switch_assessment_2
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will be available at `http://localhost:5173`.

### Login Credentials

To access the dashboard, use the following credentials on the login page:

- **Demo Site:** `https://switchmfb.netlify.app/`
- **Username:** `yaqub.adesola`
- **Password:** `123456`

### Screenshots

#### Landing Page

![Landing Page](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/landingpage.png)

#### Login Page

![Login Page](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/loginpage.png)

#### Dashboard

![Dashboard](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/dashboard.png)

#### Transaction History

![Transaction History](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/transactionhistory.png)

#### FundTransfer

![Fund Transfer](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/fundtransfer.png)

#### Confirmation

![Confirmation](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/consfirmation.png)

#### Logout Warning Modal

![Logal Warning Modal](https://github.com/yaqubadesola/switch_assessment_2/blob/master/docs/screenshots/logout_warning.png)

---

_This project was created as a technical assessment for Interswitch._
