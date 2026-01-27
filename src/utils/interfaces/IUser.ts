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
