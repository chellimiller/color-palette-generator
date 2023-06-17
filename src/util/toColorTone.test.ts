import { ColorTone } from '../types';
import toColorTone from './toColorTone';

describe('toColorTone', () => {
  test.each<{ input: number; expected: ColorTone }>([
    { input: -25, expected: '00' },
    { input: 0, expected: '00' },
    { input: 5, expected: '05' },
    { input: 25, expected: '25' },
    { input: 52, expected: '50' },
    { input: 99.1, expected: '99' },
    { input: 99.9, expected: '100' },
    { input: 9912349, expected: '100' },
  ])('should convert $input to "$expected"', ({ input, expected }) => {
    expect(toColorTone(input)).toEqual(expected);
  });
});
