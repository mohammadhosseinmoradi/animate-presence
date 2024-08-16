import { useEffect, useLayoutEffect } from 'react';

/**
 *  The purpose of using useIsomorphicLayoutEffect is to ensure that the effect runs synchronously,
 *  similar to useLayoutEffect, both in the browser and server environments.
 *  This can be useful in scenarios where you need to perform DOM manipulations that rely on the rendered state before the browser paints the screen.
 *  However, keep in mind that using useIsomorphicLayoutEffect may have performance implications in server-side rendering (SSR) scenarios.
 *  Consider using it judiciously and ensure it aligns with your specific use case and requirements.
 */

const useIsomorphicLayoutEffectHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useIsomorphicEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  useIsomorphicLayoutEffectHook(effect, deps);
}
