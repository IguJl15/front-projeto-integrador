import { Term } from "../entities/Term";

export interface CreateDirectionDto {
  title: string;
  redirectEmail: string;
  inclusionTerms: Term[];
  exclusionTerms: Term[];
}
