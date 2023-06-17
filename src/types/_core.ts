export interface ModifiableValue<T> {
  defaultValue: T;
  currentValue?: T;

  readonly value: T;
}

export type WithContrastVariant<NAME extends string> = NAME | `on-${NAME}`;

export type WithMutedVariant<NAME extends string> = NAME | `${NAME}--muted`;

export type WithDepthVariants<NAME extends string> =
  | NAME
  | `${NAME}--high`
  | `${NAME}--low`;
