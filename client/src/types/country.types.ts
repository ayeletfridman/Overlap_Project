export interface City {
  _id: string;
  name: string;
  countryId: string;
}

export interface Country {
  _id: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  cities: City[] | string[]; 
}

export interface CountryFormValues extends Omit<Country, '_id' | 'cities'> {
  cities: (string | Partial<City>)[];
}