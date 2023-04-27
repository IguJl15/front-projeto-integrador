import { PromiseOr } from './PromiseOr';

export default interface UseCase<TType, TReturn> {
  call(param: TType): PromiseOr<TReturn | null>;
}
