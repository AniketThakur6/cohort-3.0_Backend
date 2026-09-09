import app from "./app/app.js";
import config from "./config/config.js";
import connectionToDB from "./config/db.js";

await connectionToDB();

const port = config.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
