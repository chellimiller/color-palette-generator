function toObject<K extends string, U extends Record<K, unknown>>(params: {
  array: K[];
  mapper: (key: K) => U[K];
}): U {
  const { array, mapper } = params;

  return array.reduce<U>((acc, key) => {
    acc[key as K] = mapper(key as K);
    return acc;
  }, {} as U);
}

function mapObject<
  T extends Record<string, unknown>,
  U extends Record<keyof T, unknown>
>(params: {
  object: T;
  mapper: <K extends keyof T>(prev: { value: T[K]; key: K }) => U[K];
}): U {
  const { object, mapper } = params;

  return Object.entries(object).reduce<U>((acc, [key, value]) => {
    acc[key as keyof T] = mapper<keyof T>({
      value: value as T[keyof T],
      key: key as keyof T,
    });
    return acc;
  }, {} as U);
}
