import { CharacterNormilized } from '~/types';
import styles from './ExportCSV.module.scss';

type ExportCSV = {
  data: CharacterNormilized[];
  fileName: string;
};

export function ExportCSV({ data, fileName }: ExportCSV) {
  const downloadCSV = () => {
    const csvString = [
      ...data.map((item) => [
        `id: ${item.id}`,
        `Name: ${item.name}`,
        `URL: ${item.url}`,
        `Skin color: ${item.skin_color}`,
        `Eye color: ${item.eye_color}`,
        `Birth year: ${item.birth_year}`,
        `Gender: ${item.gender}`,
        `Url: ${item.url}`,
      ]),
    ]
      .map((row) => row.join('; '))
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
    <button className={styles.buttonDownload} onClick={downloadCSV}>
      Download
    </button>
  );
}
