import {Time} from "@angular/common";

export interface Concert {
  id?: number;
  performerId: number;
  day: Date;
  stage: string;
  beginTime: Time;
  endTime: Time;
}
