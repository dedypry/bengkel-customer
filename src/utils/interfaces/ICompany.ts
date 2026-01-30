export interface IBrand {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  slug: string;
  logo_url?: string;
  email?: string;
  phone_number?: string;
  fax?: string;
  npwp?: string;
  updated_by?: number;
  is_ppn?: boolean;
  ppn?: number;
  is_discount_birth_day?: boolean;
  total_discount_birth_day?: number;
  max_discount_birth_day?: number;
  type_discount_birth_day?: string;
  address?: IAddress;
}
export interface IAddress {
  id: number;
  parent_id: number;
  model: string;
  title?: string;
  zip_code?: string;
  updated_by?: number;
  province_id?: number;
  city_id?: number;
  district_id?: number;
}
