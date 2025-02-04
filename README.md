Assignment 1 :


*Device API*

This is a *Node.js* application that provides a REST API to manage devices. It uses *MongoDB Atlas* as the database to store device details. The app includes basic *CRUD operations* (Create, Read, Update, Delete) for managing devices.

*Features*
- Create a new device.
- Get details of all devices.
- Update device details.
- Delete a device.

*Tech Stack*
- *Node.js*: JavaScript runtime for server-side scripting.
- *Express*: Web framework for Node.js.
- *MongoDB*: NoSQL database to store device information.
- *MongoDB Atlas*: Cloud-hosted MongoDB service.
- *Render*: Platform for deploying the Node.js app.

*Setup Instructions*

1. *Clone the repository*:
   ```bash
   git clone https://github.com/your-username/device-api.git
   cd device-api
   ```

2. *Install dependencies*:
   ```bash
   npm install
   ```

3. *Create a `.env` file* in the root of the project:
   ```plaintext
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5001
   ```

   Replace `your_mongodb_atlas_connection_string` with your **MongoDB Atlas** connection URI.

4. *Run the application locally*:
   ```bash
   node server.js
   ```

   The app should be running on [http://localhost:5001](http://localhost:5001).

---

*API Endpoints*

1. *POST* `/api/devices`: Create a new device  
   - *Request body* (JSON):
     ```json
     {
       "name": "Smartphone",
       "type": "Electronics",
       "status": "active"
     }
     ```
   - *Response* (JSON):
     ```json
     {
       "_id": "some-object-id",
       "name": "Smartphone",
       "type": "Electronics",
       "status": "active",
       "__v": 0
     }
     ```

2. *GET* `/api/devices`: Get a list of all devices  
   - *Response* (JSON):
     ```json
     [
       {
         "_id": "some-object-id",
         "name": "Smartphone",
         "type": "Electronics",
         "status": "active",
         "__v": 0
       },
       {
         "_id": "another-object-id",
         "name": "Laptop",
         "type": "Electronics",
         "status": "inactive",
         "__v": 0
       }
     ]
     ```

3. *PUT* `/api/devices/:id`: Update a device's details  
   - *Request body* (JSON):
     ```json
     {
       "name": "Updated Smartphone",
       "type": "Electronics",
       "status": "inactive"
     }
     ```
   - *Response* (JSON):
     ```json
     {
       "_id": "some-object-id",
       "name": "Updated Smartphone",
       "type": "Electronics",
       "status": "inactive",
       "__v": 0
     }
     ```

4. *DELETE* `/api/devices/:id`: Delete a device  
   - *Response* (JSON):
     ```json
     {
       "message": "Device deleted successfully"
     }
     ```

---

*Deployment*

This project is deployed on **Render**. The live application can be accessed at:

https://device-api-1evd.onrender.com

---



### *License*

This project is licensed under the *MIT License*.

---
