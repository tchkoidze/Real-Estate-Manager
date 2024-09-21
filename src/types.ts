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

// Type for the Property at listings page
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

// Type for the property at the propery page
export interface PropertyId {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: City;
  agent: Agent;
}

export type Agent = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  email?: string;
  phone?: string;
};

export type AddAgentData = {
  name: string;
  surname: string;
  email: string;
  phone: number | null;
  avatar: string;
};

export type AddProperty = {
  price: number | null;
  zip_code: string;
  description: string;
  area: number | null;
  city: { name: string; city_id: number | null };
  address: string;
  agent: { name: string; surname: string; agent_id: number | null };
  bedrooms: number | null;
  is_rental: number | null;
  image: string;
  region: { name: string; region_id: number | null };
};

// Tooltip.tsx
export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export type Filters = {
  region: string[];
  price: [number, number] | null;
  area: [number, number] | null;
  bedrooms: number | null;
};
