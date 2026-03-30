const REST_COUNTRIES_URL =
  'https://restcountries.com/v3.1/all?fields=name,cca2';

type RestCountry = {
  name?: {
    common?: string;
  };
  cca2?: string;
};

export type CountryOption = {
  code: string;
  name: string;
};

function normalizeCountryName(value: string) {
  return value.trim().toLocaleLowerCase('en-US');
}

export const getCountryOptions = async (): Promise<CountryOption[]> => {
  const response = await fetch(REST_COUNTRIES_URL, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }

  const countries = (await response.json()) as RestCountry[];

  return countries
    .map((country) => ({
      code: country.cca2?.trim() ?? '',
      name: country.name?.common?.trim() ?? '',
    }))
    .filter(
      (country): country is CountryOption =>
        country.code.length > 0 && country.name.length > 0
    )
    .sort((left, right) => left.name.localeCompare(right.name, 'en-US'));
};

export async function resolveCountryName(country: string) {
  const countries = await getCountryOptions();
  const normalizedCountry = normalizeCountryName(country);

  return (
    countries.find(
      (entry) => normalizeCountryName(entry.name) === normalizedCountry
    )?.name ?? null
  );
}
