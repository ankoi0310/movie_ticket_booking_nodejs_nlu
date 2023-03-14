export enum Key {
  APP_USER = "APP_USER",
}

export enum DynamicKey {
  BLOG = 'BLOG',
}

export type DynamicKeyType = `${DynamicKey}_${string}`;

export function getDynamicKey(key: DynamicKey, suffix: string) {
  const dynamic: DynamicKeyType = `${key}_${suffix}`;
  return dynamic;
}