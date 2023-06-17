import { isNil } from 'lodash';
import { Color, ColorTone, keysColorTone } from '../types';

class ColorToneHelper {
  static getDefaultValue(params: { color: Color; tone: ColorTone }): string {
    const { color, tone } = params;
    return color.tone[tone].defaultValue;
  }

  static setDefaultValue<C extends Color>(params: {
    color: C;
    tone: ColorTone;
    value: string;
  }): C {
    const { color, tone, value } = params;
    const prev = color.tone[tone];
    if (value === prev.defaultValue) return color;
    return {
      ...color,
      tone: {
        ...color.tone,
        [tone]: prev.setDefault(value),
      },
    };
  }

  static getValue(params: { color: Color; tone: ColorTone }): string {
    const { color, tone } = params;
    return color.tone[tone].value;
  }

  static setValue<C extends Color>(params: {
    color: C;
    tone: ColorTone;
    value: string;
  }): C {
    const { color, tone, value } = params;
    const prev = color.tone[tone];
    if (value === prev.value) return color;
    return {
      ...color,
      tone: {
        ...color.tone,
        [tone]: prev.setValue(value),
      },
    };
  }

  static resetValue<C extends Color>(params: { color: C; tone: ColorTone }): C {
    const { color, tone } = params;
    const prev = color.tone[tone];
    if (isNil(prev.value)) return color;
    return {
      ...color,
      tone: {
        ...color.tone,
        [tone]: prev.reset(),
      },
    };
  }

  static resetAllValues<C extends Color>(params: { color: C }): C {
    let color = params.color;

    keysColorTone.forEach((tone) => {
      color = ColorToneHelper.resetValue({
        color,
        tone,
      });
    });

    return color;
  }

  static setAllDefaultValues<C extends Color>(params: {
    color: C;
    tones: Record<ColorTone, string>;
  }): C {
    const { tones } = params;
    let color = params.color;

    keysColorTone.forEach((key) => {
      color = ColorToneHelper.setDefaultValue({
        color,
        tone: key,
        value: tones[key],
      });
    });

    return color;
  }
}

export default ColorToneHelper;
