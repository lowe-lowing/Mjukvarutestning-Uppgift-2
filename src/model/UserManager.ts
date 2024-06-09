import User from "./User";
import UserDB from "./UserDb";

class UserManager {
  currentUser?: User;
  userDb: UserDB;

  constructor() {
    this.userDb = new UserDB();
  }

  public async register({ username, password }: Omit<User, "id">) {
    if (!username || !password) {
      return {
        success: false,
        message: "Felaktig input",
      };
    }
    const existingUser = await this.userDb.load({ username });
    if (existingUser) {
      return {
        success: false,
        message: "User finns redan",
      };
    }
    const highestId = Math.max(...this.userDb.users.map((user) => user.id), 0);
    const user = new User(highestId + 1, username, password);
    await this.userDb.save(user);
    return {
      success: true,
      message: "Användare skapad",
    };
  }

  public async login(username: string, password: string) {
    if (!username || !password) {
      return {
        success: false,
        message: "Felaktig input",
      };
    }
    const user = await this.userDb.load({ username });
    if (user && user.username === username && user.password === password) {
      this.currentUser = user;
      return {
        success: true,
        message: "Login Successful",
      };
    } else {
      return {
        success: false,
        message: "Felaktigt användarnamn eller lösenord",
      };
    }
  }

  public async getUser(id: number) {
    return await this.userDb.load({ id });
  }

  public async updateUser(id: number, { username }: Partial<User>) {
    if (!this.currentUser || this.currentUser.id !== id) {
      return {
        success: false,
        message: "Not logged in as user",
      };
    }
    if (!username) {
      return {
        success: false,
        message: "Felaktig input",
      };
    }
    const user = await this.userDb.load({ id });
    if (!user) {
      return {
        success: false,
        message: "User finns inte",
      };
    }
    await this.userDb.updateUsername(id, username);
    this.currentUser.username = username;
    return {
      success: true,
      message: username,
    };
  }
}

export default UserManager;
