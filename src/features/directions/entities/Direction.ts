import { Term } from './Term';

export class Direction {
  constructor(
    public id: string,
    public title: string,
    public redirectEmail: string,
    public status: string,
    public inclusionTerms: Term[],
    public exclusionTerms: Term[],
    public createdAt: Date
  ) {}
}
