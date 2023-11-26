import { Navigate } from 'react-router';
import { LIST_ROUTE } from '~/constants';

export function Home() {
  return <Navigate to={LIST_ROUTE} replace />;
}
