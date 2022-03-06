export const isRequired = (field: string) => `${field} is required`;

export const mustBeValid = (field: string) => `${field} must be valid`;

export const maxLength = (field: string, length: number) =>
  `${field} must be at most ${length} characters`;

export const minLength = (field: string, length: number) =>
  `${field} must be at least ${length} ${
    length === 1 ? 'character' : 'characters'
  }`;
