# Formula 1 RESTful API

This project is a **RESTful API** built using **Node.js**, **Express**, **TypeScript**, and **Mongoose** to manage and expose data related to the **Formula 1 2024 season**. It handles information about **races**, **teams**, **drivers**, and **circuits**.

---

## Features

The API provides endpoints for retrieving information about Formula 1:

### **GET /races**

- **URL:** `https://f1-api-c8s0.onrender.com/api/races`
- Get a list of all races.
- Includes race details along with driver information (via `driver_id`).
- Converts country codes for flags using this URL format:  
  `https://purecatamphetamine.github.io/country-flag-icons/3x2/COUNTRYCODE.svg`
- Supports a query parameter `?format=true` that formats times into more human-readable values:
  - Position 1 time is converted to `hours:minutes:seconds.milliseconds`.
  - Position 2 and 3 times are converted to seconds (3 decimal places).

### **GET /teams**

- **URL:** `https://f1-api-c8s0.onrender.com/api/teams`
- Get all teams with details about the drivers (via `driver_id`).
- Includes team flags using the same URL format for country codes.

### **GET /drivers**

- **URL:** `https://f1-api-c8s0.onrender.com/api/drivers`
- Get all drivers.
- Supports a search query parameter: `?search=Name` (case-insensitive).
- Includes driver flags based on country codes.

### **GET /circuits**

- **URL:** `https://f1-api-c8s0.onrender.com/api/circuits`
- Get all circuits.
- Supports searching by circuit name using `?search=Name`.

---

## API Structure

I’ve structured this project with a clear MVC (Model-View-Controller) pattern to make it clean and scalable:

- **Models** define the schema for the database (using Mongoose).
- **Controllers** handle the logic for each endpoint, processing data and handling responses.
- **Routes** define the API endpoints and connect them to the relevant controller functions.

---

## Links

- **GitHub Repository:** [https://github.com/Hnah07/f1-api](https://github.com/Hnah07/f1-api)
- **Live API:** [https://f1-api-c8s0.onrender.com](https://f1-api-c8s0.onrender.com)

---

## About the Project

This project was created as an exercise to practice building a RESTful API using modern web technologies. It provides a hands-on opportunity to work with APIs, databases, and server-side logic in **Node.js**. Feel free to explore the code, contribute, or try it out for yourself.

---
