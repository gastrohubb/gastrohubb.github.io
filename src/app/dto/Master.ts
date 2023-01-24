export class Master {
  masterId: any;
  name: any;
  photo: any;
  domain: any;
  experience: any;
  workplace: any;
  ghbUser: any;
  _links: any;

  constructor() {
  }

  public static fromJson(json:any): Master {
    let master: Master = new Master();
    master.masterId = json.masterId;
    master.name = json.name;
    master.photo = json.photo;
    master.domain = json.domain;
    master.experience = json.experience;
    master.workplace = json.workplace;
    master.ghbUser = json.ghbUser;
    master._links = json._links;
    return master;
  }

  public static masterOf(domain: string,
                  name: string,
                  experience: string,
                  workplace: string): Master {
    let master: Master = new Master();
    master.domain = domain;
    master.name = name;
    master.experience = experience;
    master.workplace = workplace;
    return master;
  }
}
