import Failure from "../error/Failure";

export class HttpError extends Failure {
  constructor(title: string, details?: {title: string, description: string}[]) {
    super(title, details)
  }
}
