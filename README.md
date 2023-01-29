# Nodejs E-commerce Website with TypeScript

## Introduction

This project is a fully functional e-commerce website, built using Node.js and TypeScript. It features a clean, user-friendly interface and a robust set of features to provide customers with an enjoyable shopping experience.

## Requirements

-   Node.js v12 or higher
-   npm v6 or higher
-   TypeScript v4 or higher

## Features

-   Product catalog with multiple categories and search capabilities
-   User authentication and authorization with secure password storage
-   User account management with order history and wishlist
-   Secure payment processing with Stripe
-   Admin dashboard for managing products, orders, and customers
-   Responsive design that adapts to any screen size

## Installation

-   Clone this repository using `git clone https://github.com/davydocsurg/nodejs-ecommerce-typescript.git`
-   Navigate to the project directory using cd `nodejs-ecommerce-typescript`
-   Install the dependencies using `npm install`
-   Create a `.env` file in the root of the project and configure your environment variables (see below for details)
-   Compile the TypeScript code using `npm run build`
-   Start the development server using `npm run dev`
-   Open your browser to http://localhost:3001 and start exploring the website!
-   Environment Variables
-   The following environment variables must be set in the .env file in the root of the project:

-   `STRIPE_PUBLIC_KEY`: Your Stripe public API key
-   `STRIPE_SECRET_KEY`: Your Stripe secret API key
-   `DB_URI`: The URL of your MongoDB database

## Contributions

If you would like to contribute to this project, please follow these steps:

-   Fork this repository
-   Clone your fork to your local machine
-   Create a new branch for your changes
-   Push your changes to your fork and submit a pull request to the master branch

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/davydocsurg/nodejs-ecommerce-typescript/blob/main/LICENSE.md) file for details.
