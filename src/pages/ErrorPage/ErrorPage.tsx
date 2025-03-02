import { StatusPage } from '~/components/StatusPage';

export function ErrorPage() {
  return (
    <StatusPage
      title="Oops!"
      text="Sorry, an unexpected error has occurred."
      linkText="Back to characters"
    />
  );
}
