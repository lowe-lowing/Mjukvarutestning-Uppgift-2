import type User from "./User";
import axios from "axios";

class UserDB {
  users: User[] = [];

  async save(user: User) {
    if (process.env.NODE_ENV === "test") {
      const res = await axios.post("");
      return res.data;
    }
    this.users.push(user);
    return user;
  }

  async load(user: Partial<User>) {
    if (process.env.NODE_ENV === "test") {
      const res = await axios.get("");
      return res.data;
    }
    return this.users.find((u) => u.username === user.username || u.id === user.id);
  }

  async updateUsername(id: number, username: string) {
    if (process.env.NODE_ENV === "test") {
      const res = await axios.patch("");
      return res.data;
    }
    let index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index].username = username;
      return this.users[index];
    }
  }
}

export default UserDB;
