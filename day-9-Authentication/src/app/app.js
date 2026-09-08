import express from "express";
import jwt from "jsonwebtoken";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const { name, email } = req.body;

  const token = jwt.sign(
    {
      name,
      email,
    },
    "72e5b48f8377ab11418687bc216e4eb06dfe81d0cab48f75d3bee314bf8ce5f7",
  );

  res.status(200).json({
    "user":{
      name,
      email,
    },
    token,
  })

});



export default app;