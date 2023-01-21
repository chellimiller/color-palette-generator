import * as React from 'react';
import { setColorSettings } from '../state';
import { Color, ColorVariantKey } from '../types';
import ColorVariantTable from './ColorVariantTable';

export type ColorListItemProps = {
  color: Color;
};

const ColorListItem: React.FC<ColorListItemProps> = (props) => {
  const { color } = props;

  const light = color.variants.get(20);
  const dark = color.variants.get(80);

  if (!light || !dark) {
    console.error('Missing light and/or dark variant', { color, light, dark });
    return <></>;
  }

  const { label } = color;

  return (
    <details>
      <summary style={{ background: dark.value, color: light.value }}>
        {label}
      </summary>
      <p>
        <label htmlFor="color">Color</label>
        <input
          id="color"
          value={color.base.toHexString()}
          type="color"
          onChange={(event) =>
            setColorSettings({ label, base: event.target.value })
          }
        />
        <label htmlFor="mainVariantKey">Main Variant</label>
        <input
          id="mainVariantKey"
          value={color.mainVariant}
          type="number"
          step={10}
          min={0}
          max={100}
          onChange={(event) =>
            setColorSettings({
              label,
              mainVariant: event.target.valueAsNumber as ColorVariantKey,
            })
          }
        />
        <ColorVariantTable color={color} />
      </p>
    </details>
  );
};

export default ColorListItem;
