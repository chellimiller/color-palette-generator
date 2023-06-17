import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Color, keysColorTone } from '../../types';
import ColorField from '../../ui/ColorField/ColorField';
import { setColorToneValue } from '../../state';

type ColorToneTableProps = React.PropsWithChildren<{
  color: Color;
}>;

const ColorToneTable: React.FC<ColorToneTableProps> = React.memo((props) => {
  const { color } = props;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell component="th" scope="col">
            Tone
          </TableCell>
          <TableCell component="th" scope="col">
            Hex
          </TableCell>
          <TableCell component="th" scope="col">
            +/- 40
          </TableCell>
          <TableCell component="th" scope="col">
            +/- 50
          </TableCell>
          <TableCell component="th" scope="col">
            +/- 70
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keysColorTone.map((tone) => (
          <TableRow key={tone}>
            <TableCell component="th" scope="row">
              {tone}
            </TableCell>
            <TableCell>
              <ColorField
                value={color.tone[tone].value}
                size="small"
                onChange={(event) => {
                  setColorToneValue({ value: event.target.value, color, tone });
                }}
                variant="ghost"
              />
            </TableCell>
            <TableCell>x</TableCell>
            <TableCell>x</TableCell>
            <TableCell>x</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default ColorToneTable;
