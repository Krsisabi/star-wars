import { StatusPage } from '~/components/StatusPage';

export function NotFound() {
  return (
    <StatusPage
      title="404 Not Found"
      text="The page you are looking for does not exist."
      linkText="Go to Home"
    />
  );
}
