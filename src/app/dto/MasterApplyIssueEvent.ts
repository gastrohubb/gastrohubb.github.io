import {Issue} from "./Issue";

export class MasterApplyIssueEvent {
  masterApplyIssueEventId: string = '';
  timestamp: Date = new Date();
  issue: Issue = new Issue();

  constructor(data: any) {
    if (data) {
      this.masterApplyIssueEventId = data.masterApplyIssueEventId || '';
      this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
      this.issue = data.issue ? data.issue : new Issue();
    }
  }
}
