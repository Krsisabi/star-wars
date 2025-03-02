import type { RefObject } from 'react';
import { useEffect } from 'react';

const CONTROLS = 'a, button, input, label';

type DismissArea = {
  area: RefObject<HTMLElement>;
  except: RefObject<HTMLElement>;
};

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
        !target.closest(CONTROLS)
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
