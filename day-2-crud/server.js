const express = require("express");

const app = express();

app.use(express.json());

let users = [
  { id: "1", name: "Rahul", age: 22 },
  { id: "2", name: "Aman", age: 25 },
  { id: "3", name: "Pranav", age: 78 },
  { id: "4", name: "Rohit", age: 30 },
  { id: "5", name: "Vikas", age: 27 },
];

// get -read
app.get("/users", (req, res) => {
  res.send(users);
});

// post - create
app.post("/users/create", (req, res) => {
  const newUser = req.body;
  if (Object.keys(newUser).length === 0) return res.send("no user");
  const { id, name, age } = newUser;
  if (!id.trim() || !name.trim() || age === undefined)
    return res.send("Please provide id, name and age");

  users.push(newUser);

  res.send("new user is created successfully");
});

// delete - delete
app.delete("/users/delete/:id", (req, res) => {
  console.log(req.params);
  let { id } = req.params;

  let userData = users.filter((elem) => elem.id !== id);

  console.log(userData);
  users = userData;

  res.send("user is deleted successfully");
});

//put - update
app.put("/users/update/:id", (req, res) => {
  let { id } = req.params;
  let newUser = req.body;
  if (Object.keys(newUser).length === 0) return res.send("no user");

  let { name, age } = newUser;

  let updateUser = [];

  if (age && name) {
    updateUser = users.map((elem) =>
      elem.id === id ? { ...elem, name, age } : elem,
    );
  } else {
    if (!name) {
      updateUser = users.map((elem) =>
        elem.id === id ? { ...elem, age } : elem,
      );
    } else if (age === undefined) {
      updateUser = users.map((elem) =>
        elem.id === id ? { ...elem, name } : elem,
      );
    }
  }

  users = updateUser;

  res.send("user updated successfully");
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
