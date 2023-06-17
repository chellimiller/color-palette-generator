import { isNil } from 'lodash';
import {
  ColorMode,
  ColorTone,
  NeutralColor,
  NeutralVariant,
  NeutralVariantMapping,
  keysNeutralVariant,
} from '../types';
import { ModifiableValue } from '../types/_core';
import ModifiableValueHelper from './ModifiableValueHelper';

class NeutralVariantHelper {
  static getModifiableValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
  }): ModifiableValue<ColorTone> {
    const { color, variant, mode } = params;
    return color.neutral[mode][variant];
  }

  static getDefaultValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
  }): ColorTone {
    return NeutralVariantHelper.getModifiableValue(params).defaultValue;
  }

  static setDefaultValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
    value: ColorTone;
  }): NeutralColor {
    const { color, value, variant, mode } = params;
    const prev = NeutralVariantHelper.getModifiableValue(params);
    if (value === prev.defaultValue) return color;
    return {
      ...color,
      neutral: {
        ...color.neutral,
        [mode]: {
          ...color.neutral[mode],
          [variant]: ModifiableValueHelper.setDefaultValue({
            prev,
            defaultValue: value,
          }),
        },
      },
    };
  }

  static getValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
  }): ColorTone {
    return NeutralVariantHelper.getModifiableValue(params).value;
  }

  static setValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
    value: ColorTone;
  }): NeutralColor {
    const { color, value, variant, mode } = params;
    const prev = NeutralVariantHelper.getModifiableValue(params);
    if (value === prev.value) return color;
    return {
      ...color,
      neutral: {
        ...color.neutral,
        [mode]: {
          ...color.neutral[mode],
          [variant]: ModifiableValueHelper.setValue({ prev, value }),
        },
      },
    };
  }

  static resetValue(params: {
    color: NeutralColor;
    variant: NeutralVariant;
    mode: ColorMode;
  }): NeutralColor {
    const { color, variant, mode } = params;
    const prev = NeutralVariantHelper.getModifiableValue(params);
    if (isNil(prev.value)) return color;
    return {
      ...color,
      neutral: {
        ...color.neutral,
        [mode]: {
          ...color.neutral[mode],
          [variant]: ModifiableValueHelper.reset(prev),
        },
      },
    };
  }

  static resetAllValues(params: {
    color: NeutralColor;
    mode: ColorMode;
  }): NeutralColor {
    const { mode } = params;
    let color = params.color;

    keysNeutralVariant.forEach((variant) => {
      color = NeutralVariantHelper.resetValue({
        color,
        mode,
        variant,
      });
    });

    return color;
  }

  static setAllDefaultValues(params: {
    color: NeutralColor;
    variants: NeutralVariantMapping;
    mode: ColorMode;
  }): NeutralColor {
    const { variants, mode } = params;
    let color = params.color;

    keysNeutralVariant.forEach((key) => {
      color = NeutralVariantHelper.setDefaultValue({
        color,
        variant: key,
        value: variants[key],
        mode,
      });
    });

    return color;
  }
}

export default NeutralVariantHelper;
