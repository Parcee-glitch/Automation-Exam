# **Automation Exam**

This repository contains automation test scripts written using **Playwright** for end-to-end testing. The tests are structured using the **Page Object Model (POM)** pattern to ensure maintainability, reusability, and ease of understanding.

---

## **Prerequisites**

To run the automation scripts, ensure the following software is installed on your machine:

- **Node.js** (version 14 or higher)  
  Download and install it from [Node.js official website](https://nodejs.org/).

- **Git**  
  If Git is not installed, follow the installation guide on [Git's website](https://git-scm.com/downloads).

- **Playwright**  
  Playwright is used for end-to-end testing in this repository. Instructions for installation are provided below.

---

## **Installation Steps**

Follow these steps to set up the project and run the automation tests:

1. **Clone the repository**

   Use the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/Parcee-glitch/Automation-Exam.git

2. **Navigate to the project directory**

  Once cloned, move into the project directory:
  cd Automation-Exam

3. **Install dependencies**
npm install
---

## **Test Structure**

Automation-Exam
│
├── pages/                # Contains Page Object Model (POM) classes
│   ├── homePage.ts       # Home page object class with actions
│   ├── footerPage.ts     # Footer page object class with actions
|   ├── searchPage.ts     # Searh page object class with actions
|   ├── themeMode.ts      # Theme mode page object class with actions
│
├── e2e/                    # Contains test specifications
│   ├── homePage.spec.js    # Tests for homepage and its functionality
|   ├── searchPage.spec.js  # Tests for search bar and its functionality
|   ├── themeMode.spec.js   # Tests for dark and light mode
│
├── config/               # Configuration files
│   ├── configs.js        # Configurations such as base URL, etc.
│
├── package.json          # Project's metadata and dependencies
│
└── README.md             # Project documentation

---

## **Running the test**

1. **Run all tests**
npx playwright test

2. **Run test with UI**
npx playwright test --ui
