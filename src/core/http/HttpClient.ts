import { API_URL } from '@/config';
import { AuthData, AuthRepository } from '@/features/auth';
import axios, { Axios, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authRepository } from '../contexts/AuthContext';
import { BrowserLocalStorage } from '../local_storage/LocalStorage';
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
    this.axios = axios.create({ baseURL: baseUrl });

    this.axios.interceptors.request.use(this.authRequestInterceptor);
    this.axios.interceptors.response.use((response) => {
      console.log(response.status);
      return response;
    }, this.authResponseErrorInterceptor);
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

  async authResponseErrorInterceptor(error: AxiosError): Promise<InternalAxiosRequestConfig> {
    if (error.response?.status == 401) {
      authRepository.refreshTokens();

      error.response = await axios.request({ ...error.config });
      return { ...error.config } as InternalAxiosRequestConfig;
    }

    const errorData = error.response?.data as { error: { title: string } };

    const hasDetails: boolean = Object.keys(errorData.error).length > 1;
    let details: { title: string; description: string }[] | undefined;

    if (hasDetails) {
      details = [];
      Object.entries(errorData.error).forEach((entry) => {
        if (entry[0] != 'title')
          details?.push({ title: entry[0], description: entry[1] as string });
      });
    }

    throw new HttpError(errorData.error.title, details);
  }

  authRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    config.headers!.Accept = 'application/json';

    const token = BrowserLocalStorage.instance.read<AuthData>(
      AuthRepository.localStorageKey
    )?.accessToken;
    if (token) config.headers.Authorization = 'bearer ' + token;

    return config;
  }
}
