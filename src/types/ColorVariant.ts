export type ColorVariantKey =
  | 0
  | 10
  | 20
  | 30
  | 40
  | 50
  | 60
  | 70
  | 80
  | 90
  | 100;

export type ColorVariant = {
  label: string;
  value: string;
  key: ColorVariantKey;
};
