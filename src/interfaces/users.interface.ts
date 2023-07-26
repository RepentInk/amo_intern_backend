export interface UserInterface {
  getAllUsers(): Promise<void>;
  createUser(user: []): Promise<void>;
}
