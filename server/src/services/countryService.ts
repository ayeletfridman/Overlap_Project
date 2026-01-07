import Country, { ICountry } from '../models/Country';
import City from '../models/City';

import { fetchCountries } from '../utils/fetchCountries';
import * as cityService from './cityService';
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
  return await Country.find().populate('cities').select('-__v');
};

export const getCountryByIdFromDB = async (id: string) => {
  return await Country.findById(id).populate('cities').select('-__v');
};

export const createNewCountryInDB = async (countryData: any) => {
  const { cities, ...countryFields } = countryData;
  
  const newCountry = new Country({ ...countryFields, cities: [] });
  const savedCountry = await newCountry.save();

  if (cities && cities.length > 0) {
    const savedCities = await cityService.createCitiesForCountry(savedCountry._id.toString(), cities);
    savedCountry.cities = savedCities.map(city => city._id) as any;
    await savedCountry.save();
  }
  return savedCountry;
};

export const updateCountryInDB = async (id: string, updateData: any) => {
  const { cities, ...countryFields } = updateData;

  const updatedCountry = await Country.findByIdAndUpdate(
    id,
    countryFields,
    { new: true, runValidators: true }
  );

  if (!updatedCountry) return null;

  if (cities && Array.isArray(cities)) {
    const syncedCities = await cityService.syncCountryCities(id, cities);
    updatedCountry.cities = syncedCities.map(city => city._id) as any;
    await updatedCountry.save();
  }
  return await updatedCountry.populate('cities');
};

export const deleteCountryFromDB = async (id: string) => {
  await cityService.deleteCitiesByCountryId(id);
    return await Country.findByIdAndDelete(id);
};

export const resetCountries = async ()=>{
      fetchCountries();
      await City.deleteMany({});
      
      console.log('Countries reset successfully!');
}

