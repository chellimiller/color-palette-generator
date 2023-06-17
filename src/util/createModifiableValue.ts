import { ModifiableValue } from '../types/_core';

function createModifiableValue<T>(params: {
  defaultValue: T;
  currentValue?: T;
}): ModifiableValue<T> {
  const { defaultValue, currentValue = undefined } = params;

  return Object.freeze({
    defaultValue,
    currentValue,
    value: currentValue ?? defaultValue,
    setDefault: (value: T) =>
      createModifiableValue({ defaultValue: value, currentValue }),
    setValue: (value: T) =>
      createModifiableValue({ currentValue: value, defaultValue }),
    reset: () =>
      createModifiableValue({ defaultValue, currentValue: undefined }),
  });
}
export default createModifiableValue;
