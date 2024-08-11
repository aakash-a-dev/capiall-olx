import express from "express";
import registerRoute from "./routes/auth/register";
import loginRoute from "./routes/auth/login";
import bodyParser from 'body-parser';
import cors from "cors";
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3000;

app.use("/v1", registerRoute);
app.use("/v1", loginRoute);



app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})