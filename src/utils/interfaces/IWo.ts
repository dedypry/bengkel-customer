import { IUserOffice, IVehicle } from "./IUser";

export interface IWo {
  id: number;
  created_at: string;
  updated_at: string;
  trx_no?: string;
  queue_no?: string;
  current_km?: number;
  priority?: string;
  status?: string;
  company_id?: number;
  customer_id?: number;
  vehicle_id?: number;
  supervisor_id?: number;
  mechanic_id?: number;
  updated_by?: number;
  sparepart_total?: number;
  service_total?: number;
  sub_total?: number;
  grand_total?: number;
  ppn_percent?: number;
  ppn_amount?: number;
  progress?: string;
  discount_amount?: number;
  start_at?: string;
  end_at?: string;
  promo_data?: IPromo[];
  promo_amount?: number;
  complaints?: string;
  next_sugestion?: string;
  vehicle: IVehicle;
  services: IWoItem<IService>[];
  spareparts: IWoItem<IProduct>[];
  mechanics: IUserOffice[];
}

export interface IWoItem<T> {
  id: number;
  created_at: string;
  updated_at: string;
  data?: T;
  qty?: number;
  price?: number;
  total_price?: number;
  priority?: string;
  status?: string;
  work_order_id?: number;
  updated_by?: number;
  type?: string;
}

export interface IProduct {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  company_id?: number;
  name: string;
  image?: string;
  description?: string;
  category_id?: number;
  supplier_id?: number;
  purchase_price?: number;
  sell_price?: number;
  stock?: number;
  min_stock?: number;
  unit?: string;
  location?: string;
  is_active?: boolean;
  updated_by?: number;
  slug?: string;
  uom_id?: number;
  ppn?: number;
}

export interface IService {
  id: number;
  created_at: string;
  updated_at: string;
  company_id?: number;
  name: string;
  code?: string;
  description?: string;
  price?: number;
  estimated_duration?: number;
  difficulty?: any;
  category_id?: number;
  is_active?: boolean;
  updated_by?: number;
  estimated_type?: string;
  ppn?: number;
  supplier_id?: number;
}

export interface IPromo {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  name: string;
  type?: string;
  value?: number;
  max_discount?: number;
  min_purchase?: number;
  company_id?: number;
  start_date?: string;
  end_date?: string;
  quota?: number;
  used_count?: number;
  is_active?: boolean;
  description?: string;
  updated_by?: number;
  price?: number;
}
