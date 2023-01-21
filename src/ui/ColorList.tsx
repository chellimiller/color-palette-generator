import * as React from 'react';
import { useColors } from '../state';
import ColorListItem from './ColorListItem';
import CreateColorForm from './CreateColorForm';

const ColorList: React.FC = (props) => {
  const colors = useColors();

  return (
    <section>
      <details>
        <summary>New Color</summary>
        <CreateColorForm />
      </details>
      {colors.map((color) => (
        <ColorListItem key={color.label} color={color} />
      ))}
    </section>
  );
};

export default ColorList;
