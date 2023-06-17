import tinycolor from 'tinycolor2';

function getContrastRatio(params: {
  color: tinycolor.Instance | string;
  contrast: tinycolor.Instance | string;
}): number {
  const { color, contrast } = params;

  return tinycolor.readability(color, contrast);
}

export default getContrastRatio;
