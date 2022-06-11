import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http"
import { Server } from "socket.io";


import authRoute from "./routes/auth.js"
import productsRoute from "./routes/products.js"
import roboticsRoute from "./routes/robotics.js"
import Robotics from "./models/Robotics.js"
// import { createAdapter } from "@socket.io/mongo-adapter"

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

dotenv.config();

// const io = new Server({
//   cors: {
//     origin: "* ",
//   },
// });

const port = process.env.PORT || 4000;



const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});



 




//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth" , authRoute);
app.use("/api/products", productsRoute);
app.use("/api/robotics", roboticsRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});




server.listen(port , ()=> {
  connect()
  console.log('Server is running on port 4000')
})

io.on("connection", (socket) => {
  console.log("someone has connected")
  Robotics.find({} , (error , doc) => {
    if(error) console.log(error);
    io.emit("robots" , doc )
  })
 // console.log("someone has connected ")
 

   socket.on("disconnect", () => { 
       console.log("someone has left")
   });

})


// io.listen(5000)


