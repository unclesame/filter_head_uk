export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  original_price: number | null;
  image_url: string;
  images: string[];
  rating: number;
  review_count: number;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  is_best_seller: boolean;
  is_featured: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  author_name: string;
  rating: number;
  title: string;
  content: string;
  verified_purchase: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderAddress {
  line1: string;
  line2?: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  shipping_address: OrderAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  status: string;
  stripe_session_id: string;
  created_at: string;
  updated_at: string;
}
