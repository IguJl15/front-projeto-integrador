import HttpClient from '@/core/http/HttpClient';
import { Direction } from '../entities/Direction';

export class DirectionRepository {
  constructor(private httpClient: HttpClient) {}

  async getAllDirections(): Promise<Direction[]> {
    const response = await this.httpClient.get<{directions: Direction[]}>('/direction/');

    return response.directions;
  }
}
