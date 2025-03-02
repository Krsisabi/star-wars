import { useEffect, useState } from 'react';

import { Button } from '~/components/Button';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  const throwError = () => setHasError(true);

  useEffect(() => {
    if (hasError) throw new Error('Your bad =(');
  }, [hasError]);

  return (
    <Button
      icon="warning"
      label="Generate error"
      tone="danger"
      onClick={throwError}
    />
  );
}
