import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "user registered successfully",
    data: {
      email: user.email,
      phone: user.phone,
      id: user._id,
    },
  });
});

export default app;
