import { User } from "./User";

export class AuthData {
    constructor(
        public accessToken: string,
        public refreshToken: string,

        public user?: User,
    ) { }
}