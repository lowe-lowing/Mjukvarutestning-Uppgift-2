import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import axios from "axios";
import User from "./User";
import UserManager from "./UserManager";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserManager", () => {
  let mockData: User;
  let userManager: UserManager;

  beforeEach(() => {
    mockData = new User(1, "marcus", "abc");
    userManager = new UserManager();
    console.log(process.env.NODE_ENV);
  });

  it("Logga in som User", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    let result = await userManager.login("marcus", "abc");

    expect(result.success).toBe(true);
    expect(userManager.currentUser?.username).toBe("marcus");
  });

  it("Logga in med fel lösenord", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    let result = await userManager.login("marcus", "123");

    expect(result.success).toBe(false);
    expect(userManager.currentUser).toBeUndefined();
  });

  it("Spara en ny användare", async () => {
    mockedAxios.post.mockResolvedValue({ data: null });

    let result = await userManager.register(mockData);

    expect(result.success).toBe(false);
  });

  it("Spara en ny användare som redan finns", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    let result = await userManager.register(mockData);

    expect(result.success).toBe(false);
  });

  it("Spara något som inte är en User", async () => {
    let result = await userManager.register(new User(0, "", ""));

    expect(result.success).toBe(false);
  });

  it("Skapa ny användare, sedan ändra användarnamn", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
    mockedAxios.patch.mockResolvedValue({ data: null });

    await userManager.register(mockData);
    await userManager.login(mockData.username, mockData.password);

    let result = await userManager.updateUser(1, { username: "marcus2" });

    console.log(result);

    expect(result?.success).toBe(true);
    expect(userManager.currentUser?.username).toBe("marcus2");
  });
});
