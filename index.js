import dotenv from "dotenv";
import { app, io, httpServer } from "./ws/index.js";

dotenv.config();

const port = process.env.PORT;

app.get('/test', (req, res) => {
  res.json('hello')
})

httpServer.listen(port, () => {
  console.log(`server is running on ${port}`);
});
