import type { RefObject } from 'react';
import { useEffect } from 'react';

type DismissArea = {
  // Where a click dismisses.
  area: RefObject<HTMLElement>;
  // What is being dismissed: a click on it does not count.
  except: RefObject<HTMLElement>;
};

// Escape dismisses, and so does a click in the area, unless it lands on a
// control that has a job of its own (a link, a button, a checkbox).
export function useDismiss(
  onDismiss: () => void,
  { area, except }: DismissArea
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        area.current?.contains(target) &&
        !except.current?.contains(target) &&
        !target.closest('a, button, input, label')
      )
        onDismiss();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismiss();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [area, except, onDismiss]);
}
