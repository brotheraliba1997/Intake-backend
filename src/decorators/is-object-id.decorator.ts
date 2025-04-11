import { Matches } from 'class-validator';

export const objectIdRegex = /^[a-f\d]{24}$/i;

export function IsObjectId(validationOptions?: any) {
  return Matches(/^[a-f\d]{24}$/i, {
    message: 'must be a valid MongoDB ObjectId',
    ...validationOptions,
  });
}