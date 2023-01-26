import * as React from 'react';
import { removeColor, setColorSettings } from '../state';
import { Color, ColorVariantKey } from '../types';
import ColorVariantTable from './ColorVariantTable';
import UpdateColorForm from './UpdateColorForm';
import { Trash } from 'react-feather';

export type ColorListItemProps = {
  color: Color;
};

const ColorListItem: React.FC<ColorListItemProps> = (props) => {
  const { color } = props;

  const light = color.variants.get(10);
  const dark = color.variants.get(80);

  if (!light || !dark) {
    console.error('Missing light and/or dark variant', { color, light, dark });
    return <></>;
  }

  const { label } = color;

  return (
    <details>
      <summary style={{ background: dark.value, color: light.value }}>
        <span>{label}</span>
        <div className="flex-spacer" />
        <div role="toolbar">
          <button
            className="icon inline"
            data-tooltip={`Delete color "${label}"`}
            onClick={() => removeColor(label)}
          >
            <Trash />
          </button>
        </div>
      </summary>
      <div>
        {/* <UpdateColorForm color={color} /> */}
        <ColorVariantTable color={color} />
      </div>
    </details>
  );
};

export default ColorListItem;
