import * as React from 'react';
import { setColorVariant } from '../state';
import { Color, ColorVariantKey } from '../types';
import { getContrast, getContrastColorVariantKey, roundDigits } from '../util';

type ColorPaletteTableProps = {
  color: Color;
};

const ColorVariantTable: React.FC<ColorPaletteTableProps> = React.memo(
  (props) => {
    const { color } = props;

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Hex Color</th>
            <th scope="col">Ratio -40</th>
            <th scope="col">Ratio -50</th>
            <th scope="col">Ratio -70</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(color.variants.entries()).map(([variantKey, variant]) => {
            const contrastMinus40 = getContrast({
              variant,
              color,
              steps: -40,
              minimumRatio: 3,
            });

            const contrastMinus50 = getContrast({
              variant,
              color,
              steps: -50,
              minimumRatio: 4.5,
            });

            const contrastMinus70 = getContrast({
              variant,
              color,
              steps: -70,
              minimumRatio: 7,
            });

            return (
              <tr key={variantKey}>
                <th scope="row">{variant.label}</th>
                <td>
                  <input
                    type="color"
                    value={variant.value}
                    onChange={(event) => {
                      setColorVariant({
                        label: color.label,
                        key: variantKey,
                        value: event.target.value,
                      });
                    }}
                  />
                </td>
                {contrastMinus40 !== null ? (
                  <td
                    style={{
                      border: contrastMinus40.belowMinimumRatio
                        ? '2px solid red'
                        : undefined,
                      background: variant.value,
                      color: contrastMinus40.variant.value,
                    }}
                    data-tooltip={`Contrast with '${contrastMinus40.variant.label}'`}
                  >
                    {roundDigits(contrastMinus40.ratio)}
                  </td>
                ) : (
                  <td />
                )}
                {contrastMinus50 ? (
                  <td
                    style={{
                      border: contrastMinus50.belowMinimumRatio
                        ? '2px solid red'
                        : undefined,
                      background: variant.value,
                      color: contrastMinus50.variant.value,
                    }}
                    data-tooltip={`Contrast with '${contrastMinus50.variant.label}'`}
                  >
                    {roundDigits(contrastMinus50.ratio)}
                  </td>
                ) : (
                  <td />
                )}
                {contrastMinus70 ? (
                  <td
                    style={{
                      border: contrastMinus70.belowMinimumRatio
                        ? '2px solid red'
                        : undefined,
                      background: variant.value,
                      color: contrastMinus70.variant.value,
                    }}
                    data-tooltip={`Contrast with '${contrastMinus70.variant.label}'`}
                  >
                    {roundDigits(contrastMinus70.ratio)}
                  </td>
                ) : (
                  <td />
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);

export default ColorVariantTable;
