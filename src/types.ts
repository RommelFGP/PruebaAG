export interface Property {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: string;
  location: string;
  image: string;
  type: 'casa' | 'departamento' | 'local' | 'terreno';
  beds?: number;
  baths?: number;
  sqft?: number;
}

export interface Lead {
  id: number;
  name: string;
  whatsapp: string;
  operation: string;
  propertyType: string;
  zone: string;
  budget: string;
  classification: 'HOT' | 'WARM' | 'COLD';
  timeline: string;
  status: 'pending' | 'attended';
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
}
