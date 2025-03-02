import { Button } from '~/components/Button';
import type { CharacterNormalized } from '~/types';
import { toCsv } from '~/utils/csv';
import { downloadFile } from '~/utils/download';

type ExportCSVProps = {
  data: CharacterNormalized[];
  fileName: string;
};

type Column = {
  header: string;
  value: (character: CharacterNormalized) => string;
};

const COLUMNS: Column[] = [
  { header: 'id', value: ({ id }) => String(id) },
  { header: 'Name', value: ({ name }) => name },
  { header: 'Skin color', value: ({ skin_color }) => skin_color },
  { header: 'Eye color', value: ({ eye_color }) => eye_color },
  { header: 'Birth year', value: ({ birth_year }) => birth_year },
  { header: 'Gender', value: ({ gender }) => gender },
  { header: 'URL', value: ({ url }) => url },
];

export function ExportCSV({ data, fileName }: ExportCSVProps) {
  const download = () => {
    const header = COLUMNS.map((column) => column.header);
    const rows = data.map((character) =>
      COLUMNS.map((column) => column.value(character))
    );

    downloadFile(toCsv([header, ...rows]), fileName, 'text/csv');
  };

  return <Button icon="download" label="Download" onClick={download} />;
}
