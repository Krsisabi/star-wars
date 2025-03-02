import { StatusPage } from '~/components/StatusPage';
import { useSearchLink } from '~/hooks/useSearchLink';

export function MissingPage({ page }: { page: number }) {
  const { toPage } = useSearchLink();

  return (
    <StatusPage
      title={`Page ${page} doesn't exist`}
      text="The list ends before this page."
      linkText="Go to page 1"
      linkTo={toPage(1)}
    />
  );
}
