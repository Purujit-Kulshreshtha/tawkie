import { useState } from 'react';

export interface IContextValue<T> {
  value?: T;
  setValue: (value: T) => void;
  clear: () => void;
}

export const useIContext = <S>(defaultValue?: S): IContextValue<S> => {
  const [value, setValue] = useState<S | undefined>(defaultValue);

  const clear = () => {
    setValue(undefined);
  };

  return { value, setValue, clear };
};
