import * as React from 'react';
import { ColorPaletteSettings, Override } from '../types';
import ColorPaletteSettingsInput from './ColorPaletteSettingsInput';

export type ColorPaletteSettingsFormProps = Override<
  React.ComponentProps<'form'>,
  {
    value: ColorPaletteSettings;
    onChange?: (event: unknown, data: ColorPaletteSettings) => void;
  }
>;

const ColorPaletteSettingsForm: React.FC<ColorPaletteSettingsFormProps> = (
  props
) => {
  const { value, onChange, ...forwarded } = props;

  const doHandleOnChange = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { target } = event as any;

      console.log('change', {
        name: target.name,
        value: target.value,
      });
    },
    [onChange]
  );

  return (
    <form {...forwarded} onChange={doHandleOnChange}>
      <fieldset>
        <ColorPaletteSettingsInput
          name="saturationA"
          label="a"
          defaultValue={value.saturationValues.a * 100}
          type="number"
        />
        <ColorPaletteSettingsInput
          name="saturationB"
          label="b"
          defaultValue={value.saturationValues.b * 100}
          type="number"
        />
        <ColorPaletteSettingsInput
          name="saturationC"
          label="c"
          defaultValue={value.saturationValues.c * 100}
          type="number"
          min={-100}
          max={100}
        />
      </fieldset>
      <fieldset>
        <ColorPaletteSettingsInput
          name="contrastRatio"
          label="Target Contrast Ratio"
          defaultValue={value.contrast.ratio}
          type="number"
        />
        <ColorPaletteSettingsInput
          name="contrastDark"
          label="Dark Text"
          defaultValue={value.contrast.dark.toHex()}
          type="color"
        />
        <ColorPaletteSettingsInput
          name="contrastLight"
          label="Light Text"
          defaultValue={value.contrast.light.toHex()}
          type="color"
        />
      </fieldset>
    </form>
  );
};

export default ColorPaletteSettingsForm;
