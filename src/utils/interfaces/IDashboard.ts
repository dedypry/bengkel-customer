import { IWo } from "./IWo";

export interface IDashboard {
  bookingActive: number;
  totalService: number;
  ongoingService: IWo;
  recentActivities: IWo[];
}
