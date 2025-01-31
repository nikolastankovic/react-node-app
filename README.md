# Backend Environment Setup

To configure the project, you need to create a `.env` file in the root directory and add the following environment variables:

## Steps to Create `.env` File
1. Open your terminal and navigate to the project root directory.
2. Create a new `.env` file by running the following command:
   ```sh
   touch .env
   ```
3. Open the `.env` file in a text editor and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/app-backend
   ACCESS_TOKEN_SECRET=your-access-secret-key
   REFRESH_TOKEN_SECRET=your-refresh-secret-key
   NODE_ENV="LOCAL"
   ```
4. Save the file and close the editor.

## Notes
- Ensure that you replace `your-access-secret-key` and `your-refresh-secret-key` with strong, unique secret keys.
- Restart the application after making changes to the `.env` file to apply the new configurations.

## Running the Application
After setting up the `.env` file, you can start the application using:
```sh
npm start
```




# Frontend 
Run frontend with :
```sh
npm run dev
```