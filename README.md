# Teva Naot Better Clone

## Project Overview

### Project Name

**Teva Naot Better Clone**

### Project Description

The goal of this project is to provide customers with the best shopping experience while allowing the company full control through a modern, user-friendly dashboard. The new site replaces the outdated and slow e-commerce site of the Israeli shoe brand, Teva Naot.

### Team Members

- **Kislev Levy** - Team Leader
- **Yaron Ender** - Frontend, API Integration
- **Kobi Set** - Frontend, Routing and Special Components
- **Dana Levin** - Backend, Data Manager, Reviews and Order Routes
- **David Terabisi** - Backend, Aggregation Manager, Product, User, and Auth Routes

## Technologies Used

<!-- prettier-ignore -->
| Frontend | Backend | External Services |
|----------|---------|-------------------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![RTK](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white) ![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white) ![Flowbite](https://img.shields.io/badge/Flowbite-3C5A99?style=for-the-badge) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Material UI](https://img.shields.io/badge/MUI-0081CB?style=for-the-badge&logo=mui&logoColor=white) ![Mantine UI](https://img.shields.io/badge/Mantine_UI-0A0A0A?style=for-the-badge) ![AOS](https://img.shields.io/badge/AOS-FF5722?style=for-the-badge) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white) ![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FF9E00?style=for-the-badge&logo=openweathermap&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge) ![bcrypt](https://img.shields.io/badge/bcrypt-854ABA?style=for-the-badge&logo=crypt&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white) ![Helmet](https://img.shields.io/badge/Helmet-FF0000?style=for-the-badge) ![HPP](https://img.shields.io/badge/HPP-000000?style=for-the-badge) ![Validator](https://img.shields.io/badge/Validator-000000?style=for-the-badge) ![XSS Clean](https://img.shields.io/badge/XSS_Clean-00E5E5?style=for-the-badge) ![Nodemailer](https://img.shields.io/badge/Nodemailer-000000?style=for-the-badge) ![Multer](https://img.shields.io/badge/Multer-FFA500?style=for-the-badge) | ![Cloudinary](https://img.shields.io/badge/Cloudinary-F0F0F0?style=for-the-badge&logo=cloudinary&logoColor=009DFF) ![Hostinger](https://img.shields.io/badge/Hostinger-FF4500?style=for-the-badge) ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white) |

## Frontend

### Framework and Libraries

- The entire frontend of the site is built using **Create Vite React App**.
- State management and API handling with the backend are managed using **RTK** (Redux Toolkit).
- For external API calls that are not handled by our backend, **jQuery** is used, such as auto-completing city names in addresses using the Israeli government API and handling Leaflet coordinates using the OpenWeatherMap API.

### Design and UI

- All components in the site are based on **Flowbite**, **Material UI**, and **Mantine UI** and styled with **Tailwind CSS** to improve readability and performance.
- Animation libraries include **AOS**, **loadable-image**, and **transitions-kit**.

### Map Integration

- **Leaflet** is used for the store locator in the company information section.

### Routing

- All routes are in readable Hebrew to improve user comfort and ability to share links. Restricted routes are managed by making a call to the backend to verify permissions. If access is denied, the user is redirected to the home page.

## Backend

### Server and Framework

- Built using **Node.js** and **Express**, providing all API features.

### Database

- **MongoDB Atlas** with **Mongoose** for schema design. Optimization techniques include using array data types, virtual fields, and indexes for common filters, and utilizing aggregation for complex queries.

### User Security

- Implemented using **bcrypt** for hashing passwords and **JWT** (JSON Web Tokens) for managing user sessions and permissions.

### Cybersecurity

- Middleware includes:
  ```javascript
  app.use(cookieParser());
  app.use(helmet());
  const limiter = rateLimit({
    max: 100,
    windowMs: 3600000,
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api", limiter);
  app.use(express.json({ limit: "10kb" }));
  app.use(mongoSanitize());
  app.use(xss());
  ```

### File and Image Handling

- Using **Multer** for handling file uploads, ensuring files are of type PNG or JPEG and resizing them to a maximum of 1MB before uploading to **Cloudinary**.

### Email Handling

- Emails are constructed in a custom HTML file and sent using **Nodemailer** and **Hostinger**.

## Payment and Order Tracking

### Payment Integration

- Orders are created to check and preserve items. PayPal is used for payment handling. Users are redirected to PayPal for payment and returned to the site with a confirmation message. In case of payment failure or cancellation, the order is canceled, and items are returned to stock.

## Dashboard

### Dashboard Features

- For employees of Teva Naot to manage products, sales stats, and orders. Customer service managers can update user information to assist customers.

### User Roles and Permissions

- Managed manually in the database, with roles including customer, employee, and admin. Customers cannot access the dashboard, employees have restricted access, and admins have full access.

### Order Management

- Shipment managers can track orders, change order statuses, search for orders by ID, and print shipping labels.

### Product Management

- Products can be edited, including colors, stock, price, and more. Real-time stock information is available.

## Deployment

### Hosting

- Backend is hosted on **Google Cloud** and the frontend on **Vercel** or **Render**.

## Documentation Sections

### Installation and Setup

- Instructions on how to install and set up the project locally:

1. Frontend-

```bash
npm install # to install all dependecies
npm run build # to build the react app
npm run dev # to satrt dev react app
```

2. Backend-

First create .env file regardes to the format and add it to the backend folder.

```bash
npm install # to install all dependecies
npm start # to run nodemon dev app
node server.js # when running the app in production mode
```

### Code Quality and Organization

1. **Consistent Folder Structure**: The project adheres to a standardized folder structure, facilitating easy navigation and organization. This approach enhances maintainability, allowing developers to quickly locate files, debug issues efficiently, and implement changes or expansions as needed.

2. **Comprehensive Schema Validation**: All backend schema validations are mirrored in the frontend to minimize errors and reduce the likelihood of invalid requests from clients. This dual-layer validation approach ensures data integrity and improves the overall robustness of the application.

3. **Adherence to Coding Guidelines**: All coding practices follow specific guidelines designed to ensure uniformity and readability across the codebase. This consistency not only aids current developers in understanding the code but also streamlines onboarding for new team members.

4. **Extensive Code Comments**: Each code block is supplemented with meaningful comments to explain its purpose and functionality. This documentation is invaluable for future developers, providing clarity and context that facilitate quicker understanding and modification of the code.

5. **Prettier and Linting Compliance**: All files have undergone Prettier and linting processes to maintain consistency with the coding standards of other developers. This practice ensures that the code remains clean, readable, and free of common errors, fostering a collaborative and efficient development environment.

### API Documentation

- [Link to Postman Documentation](https://documenter.getpostman.com/view/32737315/2sAXqwXegQ)
