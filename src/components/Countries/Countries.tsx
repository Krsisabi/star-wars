import { Country } from '~/store/formReducer';

type Props = {
  id: string;
  countries: Country[];
};

export default function Countries({ id, countries }: Props) {
  const options = countries.map((country) => (
    <option key={country.code} value={country.name}>
      {country.name}
    </option>
  ));

  return <datalist id={id}>{options}</datalist>;
}
