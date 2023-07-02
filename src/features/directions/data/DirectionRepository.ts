import HttpClient from '@/core/http/HttpClient';
import { Direction } from '../entities/Direction';

export class DirectionRepository {
  constructor(private httpClient: HttpClient) {}

  async deleteDirection(id: string): Promise<void> {
    await this.httpClient.delete<void>(`/direction/${id}`);
  }

  async getAllDirections(): Promise<Direction[]> {
    const response = await this.httpClient.get<{ directions: Direction[] }>('/direction/');

    return response.directions;
  }
}
