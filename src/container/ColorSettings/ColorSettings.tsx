import React, { useId } from 'react';
import { MenuItem, Paper, Select, TextField, Stack } from '@mui/material';
import { Color, ColorTone, keysColorTone } from '../../types';
import {
  setColorLabel,
  setColorSourceTone,
  setColorSourceValue,
} from '../../state';
import ColorField from '../../ui/ColorField/ColorField';
import SelectField from '../../ui/SelectField';

type ColorSettingsProps = React.PropsWithChildren<{
  color: Color;
}>;

const ColorSettings: React.FC<ColorSettingsProps> = React.memo((props) => {
  const { color } = props;

  const [label, setLabel] = React.useState(color.label);
  const [sourceValue, setSourceValue] = React.useState(color.source.value);

  React.useEffect(() => {
    setLabel(color.label);
    setSourceValue(color.source.value);
  }, [color, setLabel, setSourceValue]);

  return (
    <Paper sx={{ marginBottom: '1rem', padding: '1rem' }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <TextField
          label="Name"
          variant="outlined"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onBlur={() => setColorLabel({ color, label })}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setLabel(color.label);
          }}
          sx={{ width: '33%' }}
        />
        <ColorField
          label="Source"
          value={sourceValue}
          onChange={(event) => setSourceValue(event.target.value)}
          onBlur={() => setColorSourceValue({ color, sourceValue })}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setLabel(color.label);
          }}
          sx={{ width: '33%' }}
        />
        <SelectField
          value={color.source.tone}
          label="Source Tone"
          onChange={(event) => {
            setColorSourceTone({
              color,
              sourceTone: event.target.value as ColorTone,
            });
          }}
          sx={{ width: '33%' }}
        >
          {keysColorTone.map((tone) => (
            <MenuItem key={tone} value={tone}>
              {tone}
            </MenuItem>
          ))}
        </SelectField>
      </Stack>
    </Paper>
  );
});

export default ColorSettings;
