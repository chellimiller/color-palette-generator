import { isNil } from 'lodash';
import { ModifiableValue } from '../types/_core';

class ModifiableValueHelper {
  static create<T>(defaultValue: T): ModifiableValue<T> {
    return { defaultValue, value: defaultValue };
  }

  static reset<T>(prev: ModifiableValue<T>): ModifiableValue<T> {
    if (isNil(prev.currentValue)) return prev;
    return ModifiableValueHelper.create(prev.defaultValue);
  }

  static setValue<T>(params: {
    prev: ModifiableValue<T>;
    value: T;
  }): ModifiableValue<T> {
    const { prev, value } = params;
    if (prev.value === value) return prev;
    return { ...prev, value, currentValue: value };
  }

  static setDefaultValue<T>(params: {
    prev: ModifiableValue<T>;
    defaultValue: T;
  }): ModifiableValue<T> {
    const { prev, defaultValue } = params;
    if (prev.defaultValue === defaultValue) return prev;
    if (!prev.currentValue) return ModifiableValueHelper.create(defaultValue);
    return { ...prev, defaultValue };
  }
}

export default ModifiableValueHelper;
