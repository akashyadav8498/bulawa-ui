import { Type } from '@angular/core';

export const COMPONENT_REGISTRY = new Map<string, () => Promise<Type<any>>>();

export function registerComponent(type: string, loader: () => Promise<Type<any>>) {
  COMPONENT_REGISTRY.set(type, loader);
}

export function getComponentLoader(type: string): (() => Promise<Type<any>>) | undefined {
  return COMPONENT_REGISTRY.get(type);
}
