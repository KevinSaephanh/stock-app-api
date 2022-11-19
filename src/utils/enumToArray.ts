export type Enum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

export function enumToArray<T extends Enum<unknown>>(enumObj: T) {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(enumObj[key])))
    .map((k) => enumObj[k]);
}
