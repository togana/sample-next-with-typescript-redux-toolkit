import { forwardRef } from 'react';

export type InputProps = {
  name: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ name }, ref) => (
  <input
    name={name}
    type='text'
    ref={ref}
  />
));
