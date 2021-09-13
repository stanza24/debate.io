/**
 * User dto mapping database user to frontend user;
 */
export class UserDto {
    username;
    email;

    constructor(dbUser) {
        this.username = dbUser.username;
        this.email = dbUser.email;
    }
}
