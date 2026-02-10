import { supabase } from './supabase';
import type { Product } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000;
const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchProducts(options?: {
  category?: string;
  bestSellers?: boolean;
  sort?: string;
}): Promise<Product[]> {
  const key = `products:${JSON.stringify(options || {})}`;
  const cached = getCached<Product[]>(key);
  if (cached) return cached;

  let query = supabase.from('products').select('*');

  if (options?.bestSellers) {
    query = query.eq('is_best_seller', true);
  }
  if (options?.category) {
    query = query.eq('category', options.category);
  }

  switch (options?.sort) {
    case 'price-low':
      query = query.order('price', { ascending: true });
      break;
    case 'price-high':
      query = query.order('price', { ascending: false });
      break;
    case 'rating':
      query = query.order('rating', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('review_count', { ascending: false });
  }

  const { data } = await query;
  const products = data || [];
  setCache(key, products);
  return products;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const key = `product:${slug}`;
  const cached = getCached<Product>(key);
  if (cached) return cached;

  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (data) setCache(key, data);
  return data;
}

export function invalidateCache(): void {
  cache.clear();
}
