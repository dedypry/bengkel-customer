export interface IUser {
  id: number;
  name: string;
  phone: string;
  email?: string;
  code_verify?: string;
  customer_type?: string;
  nik_ktp?: string;
  credit_limit?: number;
  notes?: string;
  company_id?: number;
  updated_by?: number;
  status?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  profile: IProfile;
  vehicles: IVehicle[];
}

export interface IVehicle {
  id: number;
  plate_number: string;
  brand: string;
  model: string;
  year?: string;
  engine_capacity?: string;
  transmission_type?: string;
  fuel_type?: string;
  vin_number?: string;
  engine_number?: string;
  tire_size?: string;
  company_id?: number;
  updated_by?: number;
  color?: string;
}

interface IProfile {
  id: number;
  user_id: number;
  full_name: string;
  phone_number?: string;
  address?: string;
  gender?: string;
  photo_url?: string;
  emergency_name?: string;
  emergency_contact?: string;
  join_date?: string;
  province_id?: number;
  city_id?: number;
  district_id?: number;
  birth_date?: string;
  place_birth?: string;
  updated_by?: number;
  model?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IUserOffice {
  id: number;
  nik?: string;
  name: string;
  email: string;
  password: string;
  position?: string;
  is_active?: boolean;
  type?: string;
  department?: string;
  status?: string;
  company_id?: number;
  updated_by?: number;
  work_status?: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
