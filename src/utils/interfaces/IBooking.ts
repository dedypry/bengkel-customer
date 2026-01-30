import { IVehicle } from "./IUser";

export interface IBooking {
  id: number;
  customer_id: number;
  vehicle_id: number;
  branch_id?: number;
  booking_date: string;
  booking_time: any;
  service_type: string;
  complaint?: string;
  status?: string;
  created_by?: number;
  updated_by?: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  vehicle?: IVehicle;
}
