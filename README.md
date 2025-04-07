Prerequisites
To run the automation scripts, ensure that you have the following software installed:

1. Node.js (v16 or later)
Download Node.js if it is not already installed. Node.js is required to run Playwright and manage dependencies.

To check if Node.js is installed, run:

bash
Copy
Edit
node -v
If Node.js is installed, you will see the version number. If not, download and install the latest LTS version from the website.

2. Git
You need Git to clone the repository and manage version control.

Download Git

To check if Git is installed, run:

bash
Copy
Edit
git --version
3. Playwright
Playwright is the core library used for browser automation in these scripts. You can install it using npm (Node.js package manager).

Steps to Install and Set Up
Clone the repository

First, clone the repository to your local machine:

bash
Copy
Edit
git clone https://github.com/your-username/your-repository.git
Navigate to the repository directory:

bash
Copy
Edit
cd your-repository
Install dependencies

Install the necessary dependencies (including Playwright and other packages) by running:

bash
Copy
Edit
npm install
This will install all the required packages listed in package.json, including Playwright.

Install Playwright Browsers

After installing the dependencies, you need to install the Playwright browsers (Chromium, Firefox, WebKit). Run the following command to install them:

bash
Copy
Edit
npx playwright install
