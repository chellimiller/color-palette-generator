import { isNil } from 'lodash';
import {
  Color,
  ColorMode,
  ColorTone,
  ColorVariant,
  ColorVariantMapping,
  keysColorVariant,
} from '../types';
import { ModifiableValue } from '../types/_core';
import ModifiableValueHelper from './ModifiableValueHelper';

class ColorVariantHelper {
  static getModifiableValue(params: {
    color: Color;
    variant: ColorVariant;
    mode: ColorMode;
  }): ModifiableValue<ColorTone> {
    const { color, variant, mode } = params;
    return color.variant[mode][variant];
  }

  static getDefaultValue(params: {
    color: Color;
    variant: ColorVariant;
    mode: ColorMode;
  }): ColorTone {
    return ColorVariantHelper.getModifiableValue(params).defaultValue;
  }

  static setDefaultValue<C extends Color>(params: {
    color: C;
    variant: ColorVariant;
    mode: ColorMode;
    value: ColorTone;
  }): C {
    const { color, value, variant, mode } = params;
    const prev = ColorVariantHelper.getModifiableValue(params);
    if (value === prev.defaultValue) return color;
    return {
      ...color,
      variant: {
        ...color.variant,
        [mode]: {
          ...color.variant[mode],
          [variant]: ModifiableValueHelper.setDefaultValue({
            prev,
            defaultValue: value,
          }),
        },
      },
    };
  }

  static getValue(params: {
    color: Color;
    variant: ColorVariant;
    mode: ColorMode;
  }): ColorTone {
    return ColorVariantHelper.getModifiableValue(params).value;
  }

  static setValue<C extends Color>(params: {
    color: C;
    variant: ColorVariant;
    mode: ColorMode;
    value: ColorTone;
  }): C {
    const { color, value, variant, mode } = params;
    const prev = ColorVariantHelper.getModifiableValue(params);
    if (value === prev.value) return color;
    return {
      ...color,
      variant: {
        ...color.variant,
        [mode]: {
          ...color.variant[mode],
          [variant]: ModifiableValueHelper.setValue({ prev, value }),
        },
      },
    };
  }

  static resetValue<C extends Color>(params: {
    color: C;
    variant: ColorVariant;
    mode: ColorMode;
  }): C {
    const { color, variant, mode } = params;
    const prev = ColorVariantHelper.getModifiableValue(params);
    if (isNil(prev.value)) return color;
    return {
      ...color,
      variant: {
        ...color.variant,
        [mode]: {
          ...color.variant[mode],
          [variant]: ModifiableValueHelper.reset(prev),
        },
      },
    };
  }

  static resetAllValues<C extends Color>(params: {
    color: C;
    mode: ColorMode;
  }): C {
    const { mode } = params;
    let color = params.color;

    keysColorVariant.forEach((variant) => {
      color = ColorVariantHelper.resetValue<C>({
        color,
        mode,
        variant,
      });
    });

    return color;
  }

  static setAllDefaultValues<C extends Color>(params: {
    color: C;
    variants: ColorVariantMapping;
    mode: ColorMode;
  }): C {
    const { variants, mode } = params;
    let color = params.color;

    keysColorVariant.forEach((key) => {
      color = ColorVariantHelper.setDefaultValue({
        color,
        variant: key,
        value: variants[key],
        mode,
      });
    });

    return color;
  }
}

export default ColorVariantHelper;
