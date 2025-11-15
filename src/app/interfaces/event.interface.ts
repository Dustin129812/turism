import { AppLocation } from "./location.interface";

export interface AppEvent{
  id?: number;
  location:AppLocation;
  description: string;
  date: string;
  startHour: string;
  endHour: string;
}
