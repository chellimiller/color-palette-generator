import * as React from 'react';
import * as tinycolor from 'tinycolor2';
import { createColor } from '../state';

const CreateColorForm: React.FC = () => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const { label, base, mainVariant } = event.target as any;
      createColor({
        label: label.value,
        base: base.value,
        mainVariant: mainVariant.valueAsNumber,
      });
      event.currentTarget.reset();
    }}
  >
    <label htmlFor="addColorLabel">Label</label>
    <input type="text" id="addColorLabel" name="label" placeholder="Primary" />
    <label htmlFor="addColorValue">Color</label>
    <input
      name="base"
      id="addColorValue"
      defaultValue={tinycolor.random().toHexString()}
      type="color"
    />
    <label htmlFor="addColorMainVariant">Main Variant</label>
    <input
      id="addColorMainVariant"
      defaultValue={50}
      type="number"
      name="mainVariant"
      step={10}
      min={0}
      max={100}
    />
    <input type="submit" value="Create Color" />
  </form>
);

export default CreateColorForm;
