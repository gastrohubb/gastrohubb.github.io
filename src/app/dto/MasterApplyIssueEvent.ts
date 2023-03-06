import {Issue} from "./Issue";
import {Master} from "./Master";

export class MasterApplyIssueEvent {
  masterApplyIssueEventId: string = '';
  issue: Issue = new Issue(null);
  master: Master = new Master();
  applyTimestamp: any = null;
  approveTimestamp: any = null;
  declineTimestamp: any = null;

  constructor(data: any) {
    if (data) {
      this.masterApplyIssueEventId = data.masterApplyIssueEventId || '';
      this.issue = data.issue ? data.issue : new Issue(null);
      this.master = data.master ? data.master : new Master();
      this.applyTimestamp = data.applyTimestamp || null;
      this.approveTimestamp = data.approveTimestamp || null;
      this.declineTimestamp = data.declineTimestamp || null;

    }
  }
}
