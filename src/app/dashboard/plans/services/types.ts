export interface Plan {
  id?: string;
  name: string;
  description: string;
  currency?: string;
  monthly_price?: number;
  system_resources?: Resource[];
  created_at?: string;
  updated_at?: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  key: string;
  created_at?: string;
  updated_at?: string;
}
