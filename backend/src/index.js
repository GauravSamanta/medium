import connectDB from "./db/connectDB.js";
import { createServer } from "./server.js";

const server = createServer();

const startServer = async () => {
  try {
    await connectDB(); 
    server.listen(8000, () => {
      console.log(`Server is running on http://localhost:8000`);
    });
  } catch (e) {
    console.error("Error connecting to the database:", e);
  }
};

startServer();
