export class GhbUser {
  userId: any;
  userName: any;
  locale: any;
  email: any;
  password: any;
  sessionToken: any;
  imgUuid: any;

  constructor() {
  }

  public static fromJson(json:any): GhbUser {
    let user: GhbUser = new GhbUser();
    user.userId = json.userId;
    user.userName = json.userName;
    user.locale = json.locale;
    user.email = json.email;
    user.password = json.password;
    user.sessionToken = json.sessionToken;
    user.imgUuid = json.imgUuid;
    return user;
  }

  isEmpty(): boolean {
    return (this.userId == null || this.userId == undefined || this.userId.length == 0)
      && (this.userName == null || this.userName == undefined || this.userName.length == 0)
      && (this.sessionToken == null || this.sessionToken == undefined || this.sessionToken.length == 0);
  }
}
