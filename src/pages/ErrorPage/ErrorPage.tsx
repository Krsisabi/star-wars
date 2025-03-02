import { StatusPage } from '~/components/StatusPage';

export function ErrorPage() {
  return (
    <StatusPage
      title="Oops!"
      text="Sorry, an unexpected error has occurred."
      homeLink="Back to characters"
    />
  );
}
