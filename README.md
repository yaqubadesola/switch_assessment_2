Core Banking Customer Account Dashboard
This project presents a frontend implementation for a new Core Banking web application. It is designed to be a secure, responsive, and performant Customer Account Dashboard, integrating with backend APIs (secured with OAuth 2.0) to provide comprehensive account information, transaction history, and facilitate payments and transfers.

Demo Site
You can access and test the live application here:

Demo URL: https://switch-assesment.netlify.app/

Login Credentials
To explore the dashboard, please use the following credentials on the login page:

Username: yaqub.adesola

Password: 123456

Key Features Implemented
The application offers a range of functionalities to manage customer finances efficiently:

Account Overview Page:

Displays a consolidated view of all accounts, including Savings, Current, and Loan types.

Presents essential details such as masked account numbers (showing only the last 4 digits), current balance formatted with currency symbols, and the last transaction date.

Provides interactive filtering by account type and sorting by balance and last transaction date.

Transaction History:

Allows users to navigate to a detailed transaction history upon selecting a specific account.

Fetches and displays transaction details including date, description, amount (color-coded for debit/credit), and balance after each transaction.

Features advanced filtering and the capability to export transactions as a CSV file.

Funds Transfer Module:

Enables users to initiate secure transfers.

A user-friendly form allows selection of source account, input of beneficiary account number (with validation), transfer amount, and an optional description.

A confirmation modal is presented before finalizing any transfer.

Handles the submission to the /api/transfers endpoint and provides feedback on transfer status.

Security & Session Management:

Integrated with OAuth 2.0 authentication (mocked for the assessment).

Ensures that sensitive user data is never stored in plain text in localStorage.

Includes an auto-logout mechanism after 5 minutes of inactivity, preceded by a warning modal.

Sensitive fields are masked by default and can be revealed on demand.

Technologies Used
The project is built using a modern frontend stack:

React: For building the dynamic user interface.

React Router DOM: For handling client-side routing and navigation.

Redux Toolkit: For efficient and predictable state management, especially for asynchronous data flows.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

Heroicons: A set of beautiful, free open source SVG icons (used as React components).

Axios: A promise-based HTTP client for making API requests.

Axios Mock Adapter: For mocking API requests during development and testing.

OAuth 2.0 (Mocked): For secure authentication flows.

Core Dependencies:
@heroicons/react: ^2.2.0

@reduxjs/toolkit: ^2.8.2

axios: ^1.11.0

axios-mock-adapter: ^2.1.0

react: ^18.3.1

react-dom: ^18.3.1

react-icons: ^5.5.0

react-redux: ^9.2.0

react-router-dom: ^6.30.1
