import HttpClient from '@/core/http/HttpClient';
import { Direction } from '../entities/Direction';
import { UpdateDirectionDto } from '../dtos/UpdateDirectionDto'

export class DirectionRepository {
  constructor(private httpClient: HttpClient) { }

  async deleteDirection(id: string): Promise<void> {
    await this.httpClient.delete<void>(`/direction/${id}`);
  }

  async getAllDirections(): Promise<Direction[]> {
    const response = await this.httpClient.get<{ directions: Direction[] }>('/direction/');

    return response.directions;
  }

  async updateDirection(id: string, data: UpdateDirectionDto): Promise<Direction> {
    return this.httpClient.patch<Direction>(`/direction/${id}`, data)
  }

  async updateDirectionStatus(id: string, status: string): Promise<Direction> {
    return await this.updateDirection(id, { status: status })

  }
}
