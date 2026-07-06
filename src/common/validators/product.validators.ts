import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUpperCase', async: false })
export class IsUpperCaseConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(text: string, args: ValidationArguments) {
    return typeof text === 'string' && text === text.toUpperCase();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} phải viết hoa`;
  }
}
