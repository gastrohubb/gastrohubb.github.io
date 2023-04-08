export class KeycloakUser {
  userId: string = '';
  userName: string = '';
  email: string = '';
  authenticated: boolean = false;

  constructor() {
  }

  setUserId(userId?: string) {
    this.userId = userId ? userId : '';
  }

  setUserName(userName?: string) {
    this.userName = userName ? userName : '';
  }

  setEmail(email?: string) {
    this.email = email ? email : '';
  }

  setAuthenticated(authenticated?: boolean) {
    this.authenticated = authenticated ? authenticated : false;
  }
}
