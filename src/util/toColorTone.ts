import { ColorTone } from '../types';

function toColorTone(value: number): ColorTone {
  // Most horrible code of my life
  if (value <= 0) return '00';
  if (value < 7.5) return '05';
  if (value < 12.5) return '10';
  if (value < 17.5) return '15';
  if (value < 22.5) return '20';
  if (value < 27.5) return '25';
  if (value < 32.5) return '30';
  if (value < 37.5) return '35';
  if (value < 42.5) return '40';
  if (value < 47.5) return '45';
  if (value < 52.5) return '50';
  if (value < 57.5) return '55';
  if (value < 62.5) return '60';
  if (value < 67.5) return '65';
  if (value < 72.5) return '70';
  if (value < 77.5) return '75';
  if (value < 82.5) return '80';
  if (value < 87.5) return '85';
  if (value < 92.5) return '90';
  if (value < 97.5) return '95';
  if (value < 98) return '97';
  if (value < 99.5) return '99';
  return '100';
}

export default toColorTone;
