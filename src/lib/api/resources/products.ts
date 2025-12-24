import { KeygenClient } from '../client';
import { Product, KeygenResponse, ListOptions, KeygenListResponse } from '../../types/keygen';

/**
 * Shape of the token response returned by the Keygen API
 * when generating a product token.
 */
interface ProductTokenResponse {
  data?: {
    attributes?: {
      token?: string;
    };
  };
}

export class ProductResource {
  constructor(private client: KeygenClient) {}

  /**
   * List all products
   */
  async list(options?: ListOptions): Promise<KeygenListResponse<Product>> {
    const queryParams = new URLSearchParams();
    
    if (options?.limit) queryParams.set('limit', options.limit.toString());
    if (options?.page) queryParams.set('page', options.page.toString());
    
    const query = queryParams.toString();
    const endpoint = query ? `/products?${query}` : '/products';
    
    return this.client.request<Product[]>(endpoint);
  }

  /**
   * Get a specific product by ID
   */
  async get(productId: string): Promise<KeygenResponse<Product>> {
    return this.client.request<Product>(`/products/${productId}`);
  }

  /**
   * Create a new product
   */
  async create(data: {
    name: string;
    url?: string;
    distributionStrategy?: 'LICENSED' | 'OPEN' | 'CLOSED';
    platforms?: string[];
    metadata?: Record<string, unknown>;
  }): Promise<KeygenResponse<Product>> {
    return this.client.request<Product>('/products', {
      method: 'POST',
      body: {
        data: {
          type: 'products',
          attributes: data
        }
      }
    });
  }

  /**
   * Update a product
   */
  async update(productId: string, data: {
    name?: string;
    url?: string;
    distributionStrategy?: 'LICENSED' | 'OPEN' | 'CLOSED';
    platforms?: string[];
    metadata?: Record<string, unknown>;
  }): Promise<KeygenResponse<Product>> {
    return this.client.request<Product>(`/products/${productId}`, {
      method: 'PATCH',
      body: {
        data: {
          type: 'products',
          id: productId,
          attributes: data
        }
      }
    });
  }

  /**
   * Delete a product
   */
  async delete(productId: string): Promise<void> {
    await this.client.request<void>(`/products/${productId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Generate a product token
   */
  async generateToken(productId: string): Promise<string | undefined> {
    const response = await this.client.request(`/products/${productId}/tokens`, {
      method: 'POST',
    });

    const tokenData = (response as ProductTokenResponse)?.data?.attributes?.token;
    return tokenData;
  }
}
