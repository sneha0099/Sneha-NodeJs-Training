import fs from "fs/promises";

const FILE_PATH = "./data/users.json";

export async function createUserService(userData) {
  const data = await fs.readFile(FILE_PATH, "utf-8");

  const users = JSON.parse(data);

  const newUser = {
    id: Date.now(),
    ...userData
  };

  users.push(newUser);

  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));

  return newUser;
}