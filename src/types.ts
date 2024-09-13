// Type for the Region
export type Region = {
  id: number;
  name: string;
};

// Type for the City
export type City = {
  id: number;
  name: string;
  region_id: number;
  region: Region;
};

// Type for the Property
export type Property = {
  id: number;
  address: string;
  zip_code: string;
  price: number;
  area: number;
  bedrooms: number;
  is_rental: number;
  image: string;
  city_id: number;
  city: City;
};

export type Agent = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
};

export type AddProperty = {
  price: string;
  zip_code: string;
  description: string;
  area: string;
  city_id: string;
  address: string;
  agent_id: string;
  bedrooms: string;
  is_rental: string;
  image: string;
  created_at: string;
  id?: number;
};
