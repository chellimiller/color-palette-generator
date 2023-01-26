import * as React from 'react';
import * as tinycolor from 'tinycolor2';
import { setColorSettings } from '../state';
import { Color } from '../types';

type UpdateColorFormProps = {
  color: Color;
};

const UpdateColorForm: React.FC<UpdateColorFormProps> = (props) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const { base, mainVariant } = event.target as any;
      setColorSettings({
        label: props.color.label,
        base: base.value,
        mainVariant: mainVariant.valueAsNumber,
      });
      event.currentTarget.reset();
    }}
  >
    <label htmlFor={`updateColorBase_${props.color.label}`}>Base Color</label>
    <input
      name={`updateColorBase_${props.color.label}`}
      id="addColorValue"
      defaultValue={props.color.base.toHexString()}
      type="color"
    />
    <label htmlFor={`updateColorMainVariant_${props.color.label}`}>
      Main Variant
    </label>
    <input
      id={`updateColorMainVariant_${props.color.label}`}
      defaultValue={props.color.mainVariant}
      type="number"
      name="mainVariant"
      step={10}
      min={0}
      max={100}
    />
    <input type="submit" value="Update Color" />
  </form>
);

export default UpdateColorForm;
