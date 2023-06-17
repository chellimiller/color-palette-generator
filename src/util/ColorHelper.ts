import {
  Color,
  ColorInit,
  ColorToneRecord,
  ColorSource,
  NeutralColor,
  NeutralColorInit,
  lightColorVariantMapping,
  darkColorVariantMapping,
  darkNeutralVariantMapping,
  lightNeutralVariantMapping,
  StandardColor,
} from '../types';
import ModifiableValueHelper from './ModifiableValueHelper';
import createColorTones from './createColorToneRecord';
import generateUUID from './generateUUID';
import mapObject from './mapObject';
import randomColor from './randomColor';

class ColorHelper {
  static createColor(params: ColorInit): Color {
    const { label, sourceValue = randomColor(), sourceTone = '50' } = params;

    const source: ColorSource = { value: sourceValue, tone: sourceTone };

    const tone: ColorToneRecord = mapObject({
      object: createColorTones({ source }),
      mapper: ({ value }) => ModifiableValueHelper.create(value),
    });

    const variant: Color['variant'] = {
      light: mapObject({
        object: lightColorVariantMapping,
        mapper: ({ value }) => ModifiableValueHelper.create(value),
      }),
      dark: mapObject({
        object: darkColorVariantMapping,
        mapper: ({ value }) => ModifiableValueHelper.create(value),
      }),
    };

    return { label, source, tone, id: generateUUID(), variant };
  }

  static createStandardColor(params: ColorInit): StandardColor {
    return {
      ...ColorHelper.createColor(params),
      neutral: undefined,
    };
  }

  static createNeutralColor(params: NeutralColorInit = {}): NeutralColor {
    const {
      label = 'Neutral',
      sourceValue = '#747476',
      sourceTone = '50',
    } = params;

    const neutral: NeutralColor['neutral'] = {
      light: mapObject({
        object: lightNeutralVariantMapping,
        mapper: ({ value }) => ModifiableValueHelper.create(value),
      }),
      dark: mapObject({
        object: darkNeutralVariantMapping,
        mapper: ({ value }) => ModifiableValueHelper.create(value),
      }),
    };

    return {
      ...ColorHelper.createColor({ label, sourceValue, sourceTone }),
      neutral,
      id: 'neutral',
    };
  }

  static isNeutralColor(color: Color): color is NeutralColor {
    return !!(color as NeutralColor).neutral;
  }

  static isStandardColor(color: Color): color is StandardColor {
    return !ColorHelper.isNeutralColor(color);
  }
}

export default ColorHelper;
