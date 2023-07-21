export interface UserInterface {
    /**
      * name
    */
    getAllUsers(): Promise<User>
    createUser(user: User): User
}
