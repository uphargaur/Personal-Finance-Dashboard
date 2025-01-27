# Finance Manager Web Application

This is a web-based Finance Manager application for managing user transactions and generating financial reports. The login page is set as the main entry point of the application for both new and existing users.

## Features

- **User Authentication**: 
  - Login for registered users.
  - Registration for new users.
  - Token-based authentication to manage secure access.

- **Dashboard**: 
  - View summary reports of income, expenses, and savings.
  - Visual representations with dynamic charts and graphs.
  - Option to filter by month and year.

- **Transaction Management**:
  - Add new transactions.
  - View transactions with pagination for easier browsing.

## Pages and Endpoints

### 1. Login (`index.html`)
The entry point of the application.
- Path: `/index.html`
- Users can log in using their email and password.
- A link is provided for new users to navigate to the registration page.

### 2. Registration (`register.html`)
Allows new users to create an account.
- Input: Name, email, and password.

### 3. Dashboard (`home.html`)
Displays financial reports.
- Summary of income, expenses, and savings.
- Visualizations for financial breakdown.
- Filters for custom date ranges.

### 4. Add Transaction (`add-transaction.html`)
Enables logged-in users to add a new transaction.
- Input: Description, category, amount, and date.

### 5. View Transactions (`view-transactions.html`)
Displays a paginated list of all user transactions.

## Tech Stack

### Frontend
- **HTML, CSS**: Static pages styled for a clean and responsive design.
- **JavaScript**: Dynamic features and API integration.

### Backend
- **Kotlin (Spring Boot)**: Handles API endpoints for user authentication, transaction management, and report generation.
- **JWT Authentication**: Ensures secure access to APIs.

### Database
- **PostgreSQL/MySQL**: Stores user information, transactions, and reports.

### Hosting
- Vercel .