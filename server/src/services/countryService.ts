import Country, { ICountry } from '../models/Country';
import { fetchCountries } from '../utils/fetchCountries';
import City from '../models/City';
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

export const createNewCountryInDB = async (countryData: any) => {
  const newCountry = new Country(countryData);
  const savedCountry = await newCountry.save();

  if (countryData.cities && countryData.cities.length > 0) {
    const cityObjects = countryData.cities.map((cityName: string) => ({
      name: cityName,
      countryId: savedCountry._id
    }));
    await City.insertMany(cityObjects);
  }

  return savedCountry;
};

export const updateCountryInDB = async (id: string, updateData: any) => {
  const updatedCountry = await Country.findByIdAndUpdate(id, updateData, { new: true });

  if (updatedCountry && updateData.cities) {
    await City.deleteMany({ countryId: id });

    const cityObjects = updateData.cities.map((cityName: string) => ({
      name: cityName,
      countryId: id
    }));
    await City.insertMany(cityObjects);
  }
  return updatedCountry;
};

export const deleteCountryFromDB = async (id: string) => {
  await City.deleteMany({ countryId: id });
  return await Country.findByIdAndDelete(id);
};

export const resetCountries = async ()=>{
      fetchCountries();
      console.log('Countries reset successfully!');
}