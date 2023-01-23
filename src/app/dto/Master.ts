export class Master {
  masterId: any;
  name: any;
  photo: any;
  domain: any;
  experience: any;
  workplace: any;
  ghbUser: any;

  constructor() {
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
