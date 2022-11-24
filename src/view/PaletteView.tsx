import * as React from 'react';
import { useParams } from 'react-router-dom';

const PaletteView: React.FC = () => {
  // Get the userId param from the URL.
  let { paletteId } = useParams();

  return <div>{paletteId}</div>;
};

export default PaletteView;
