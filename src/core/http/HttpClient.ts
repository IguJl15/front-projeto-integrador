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
    const hasDetails: boolean = Object.keys(error.response?.data?.error).length > 1;
    let details: { title: string; description: string }[] | undefined;

    if (hasDetails) {
      details = [];
      Object.entries(error.response?.data?.error).forEach((key) => {
        if (key[0] != 'title') details?.push({ title: key[0], description: key[1] as string });
      });
    }

    throw new HttpError(error.response?.data?.error.title, details);
  }

  authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    config.headers!.Accept = 'application/json';

    return config;
  }
}
