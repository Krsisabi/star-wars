import { CharacterNormalized } from '~/types';
import styles from './ExportCSV.module.scss';

type ExportCSV = {
  data: CharacterNormalized[];
  fileName: string;
};

const COLUMNS = [
  'id',
  'Name',
  'Skin color',
  'Eye color',
  'Birth year',
  'Gender',
  'URL',
] as const;

const escapeCell = (value: string) =>
  /[";\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;

export function ExportCSV({ data, fileName }: ExportCSV) {
  const downloadCSV = () => {
    const rows = data.map((item) => [
      String(item.id),
      item.name,
      item.skin_color,
      item.eye_color,
      item.birth_year,
      item.gender,
      item.url,
    ]);

    const csvString = [[...COLUMNS], ...rows]
      .map((row) => row.map(escapeCell).join(';'))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      className={styles.buttonDownload}
      onClick={downloadCSV}
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 3v12M7 10l5 5 5-5M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      </svg>
      <span className={styles.label}>Download</span>
    </button>
  );
}
