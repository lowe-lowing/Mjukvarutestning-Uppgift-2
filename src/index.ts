import bodyParser from "body-parser";
import type { Request, Response } from "express";
import express from "express";
import UserManager from "./model/UserManager";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("src/pages"));
const port = 3000;

const userManager = new UserManager();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/pages/home/home.html");
});

app.get("/login", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/pages/login/login.html");
});

app.get("/register", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/pages/register/register.html");
});

app.get("/profile", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/pages/profile/profile.html");
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await userManager.login(username, password);
  res.send(result);
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const result = await userManager.register({ username, password });
  res.send(result);
});

app.get("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userManager.getUser(id);
  res.send(user);
});

app.get("/user", async (req: Request, res: Response) => {
  if (!userManager.currentUser) {
    res.send({
      message: "No user logged in",
    });
    return;
  }
  res.send(userManager.currentUser);
});

app.patch("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { username } = req.body;
  if (!userManager.currentUser || userManager.currentUser.id !== id) {
    res.send({
      success: false,
      message: "Not logged in as user",
    });
    return;
  }
  const result = await userManager.updateUser(id, { username });
  res.send(result);
});
