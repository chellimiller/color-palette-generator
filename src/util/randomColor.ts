import tinycolor from 'tinycolor2';

function randomColor(): string {
  return tinycolor.random().toHexString();
}

export default randomColor;
