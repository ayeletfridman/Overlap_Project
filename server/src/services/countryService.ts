import Country, { ICountry } from '../models/Country';
import { fetchCountries } from '../utils/fetchCountries';

export const fetchAndStoreCountries = async () => {
  try {
    const count = await Country.countDocuments();
    
    if (count === 0) {
      fetchCountries();
      console.log('Countries saved successfully!');
    } else {
      console.log('Data already exists in DB, skipping fetch.');
    }
  } catch (error) {
    console.error('Error in fetchAndStoreCountries:', error);
  }
};

export const getAllCountriesFromDB = async () => {
  return await Country.find();
};

export const getCountryByIdFromDB = async (id: string) => {
  return await Country.findById(id);
};

export const createNewCountryInDB = async (countryData: Partial<ICountry>) => {
  const newCountry = new Country(countryData);
  return await newCountry.save();
};

export const updateCountryInDB = async (id: string, updateData: Partial<ICountry>) => {
  return await Country.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCountryFromDB = async (id: string) => {
  return await Country.findByIdAndDelete(id);
};

export const resetCountries = async ()=>{
      fetchCountries();
      console.log('Countries reset successfully!');
}