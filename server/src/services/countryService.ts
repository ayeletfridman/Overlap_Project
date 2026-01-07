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
  return await Country.find().populate('cities').select('-__v');
};

export const getCountryByIdFromDB = async (id: string) => {
  return await Country.findById(id).populate('cities').select('-__v');
};

export const createNewCountryInDB = async (countryData: any) => {
  const newCountry = new Country({ ...countryData, cities: [] });
  const savedCountry = await newCountry.save();

  if (countryData.cities && countryData.cities.length > 0) {
    const cityObjects = countryData.cities.map((cityName: string) => ({
      name: cityName,
      countryId: savedCountry._id
    }));

    const savedCities = await City.insertMany(cityObjects);
    savedCountry.cities = savedCities.map(city => city._id);
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
  ).select('-__v');

  if (!updatedCountry) return null;

  if (cities && Array.isArray(cities)) {
    await City.deleteMany({ countryId: id });

    const cityObjects = cities.map((cityName: any) => ({
      name: typeof cityName === 'object' ? cityName.name : cityName,
      countryId: id
    }));

    const savedCities = await City.insertMany(cityObjects);

    updatedCountry.cities = savedCities.map(city => city._id) as any;
    await updatedCountry.save();
  }

  return updatedCountry;
};

export const deleteCountryFromDB = async (id: string) => {
  await City.deleteMany({ countryId: id });
  return await Country.findByIdAndDelete(id);
};

export const resetCountries = async ()=>{
      fetchCountries();
      await City.deleteMany({});
      
      console.log('Countries reset successfully!');
}