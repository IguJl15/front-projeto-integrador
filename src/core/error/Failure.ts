export default class Failure extends Error {
  constructor(public title: string, public details?: { title: string; description: string }[]) {
    super(title);
  }
}
