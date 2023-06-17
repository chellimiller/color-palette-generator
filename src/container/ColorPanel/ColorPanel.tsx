import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { Color } from '../../types';
import ColorSettings from '../ColorSettings/ColorSettings';
import ColorToneHelper from '../../util/ColorToneHelper';

type ColorPanelProps = React.PropsWithChildren<{
  color: Color;
}>;

const ColorPanel: React.FC<ColorPanelProps> = React.memo((props) => {
  const { color } = props;

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleExpandedChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box>
      <ColorSettings color={color} />
      <Accordion
        expanded={expanded === 'tones'}
        onChange={handleExpandedChange('tones')}
      >
        <AccordionSummary
          sx={{
            backgroundColor: ColorToneHelper.getValue({ color, tone: '40' }),
            color: ColorToneHelper.getValue({ color, tone: '99' }),
          }}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Numeric Tones
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default ColorPanel;
