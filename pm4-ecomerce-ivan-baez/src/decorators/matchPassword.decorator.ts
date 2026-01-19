import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'MatchPassword',
  async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments): boolean {
    console.log(args);

    const obj = args.object as Record<string, unknown>;
    const key = args.constraints[0]; // el campo con el que comparar
    const password = obj[key];

    return confirmPassword === password;
  }

  defaultMessage(): string {
    return 'El password y la confirmación no coinciden';
  }
}