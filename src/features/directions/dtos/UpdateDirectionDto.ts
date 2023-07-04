import { Term } from "../entities/Term";

export interface UpdateDirectionDto {
     title?: string
     redirectEmail?: string
     status?: string
     inclusionTerms?: Term[] | string[]
     exclusionTerms?: Term[] | string[]
}