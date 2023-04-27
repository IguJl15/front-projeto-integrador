import { API_URL } from '@/config';
import axios, { Axios, InternalAxiosRequestConfig } from 'axios';
import { HttpError } from './HttpError';

type Params = { [key: string]: any };

export default interface HttpClient {
  baseUrl: string;
  get<T>(path: string, params?: Params): Promise<T>;
  post<T>(path: string, data: any): Promise<T>;
}

export class AxiosClient implements HttpClient {
  axios!: Axios;

  constructor(public baseUrl: string = API_URL) {
    this.axios = axios.create({
      baseURL: baseUrl,
    });
    this.axios.interceptors.request.use(this.authRequestInterceptor);
    this.axios.interceptors.response.use(null, this.authResponseErrorInterceptor);
  }

  async get<T>(path: string, params?: Params): Promise<T> {
    const axiosResponse = await this.axios.get<T>(path, {
      params: params,
      baseURL: this.baseUrl,
    });

    return axiosResponse.data;
  }

  async post<T>(path: string, data: any, token?: string): Promise<T> {
    const axiosResponse = await this.axios.post<T>(path, data, {
      headers: { Accept: 'application/json', Authorization: token },
    });

    return axiosResponse.data;
  }

  authResponseErrorInterceptor(error: any): InternalAxiosRequestConfig {
    const message = error.response?.data?.message || error.message;
    console.log(`Erro no interceptor: ${message}`);

    throw new HttpError(message);
  }

  authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    console.log(`Making a request to: ${config.baseURL} + ${config.url}`);
    console.log(`Data:`);
    console.table(config.data);
    
    
    config.headers!.Accept = 'application/json';

    return config;
  }
}
