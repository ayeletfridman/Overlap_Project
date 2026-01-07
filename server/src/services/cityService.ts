import City from '../models/City';

export const createCitiesForCountry = async (countryId: string, cityNames: string[]) => {
  const cityObjects = cityNames.map((name) => ({ name, countryId }));
  return await City.insertMany(cityObjects);
};

export const updateCity = async (cityId: string, newName: string) => {
  return await City.findByIdAndUpdate(cityId, { name: newName }, { new: true });
};

export const deleteCity = async (cityId: string) => {
  return await City.findByIdAndDelete(cityId);
};

export const deleteCitiesByCountryId = async (countryId: string) => {
  return await City.deleteMany({ countryId });
};

export const syncCountryCities = async (countryId: string, citiesFromForm: any[]) => {
  const existingCities = await City.find({ countryId });
  const existingIds = existingCities.map(c => c._id.toString());

  const incomingIds = citiesFromForm.filter(c => typeof c === 'object' && c._id).map(c => c._id.toString());

  const idsToDelete = existingIds.filter(id => !incomingIds.includes(id));
  if (idsToDelete.length > 0) {
    await City.deleteMany({ _id: { $in: idsToDelete } });
  }

  const namesToAdd = citiesFromForm.filter(c => typeof c === 'string');
  if (namesToAdd.length > 0) {
    await createCitiesForCountry(countryId, namesToAdd);
  }

  const citiesToUpdate = citiesFromForm.filter(c => typeof c === 'object' && c._id);
  for (const city of citiesToUpdate) {
    await City.findByIdAndUpdate(city._id, { name: city.name });
  }

  return await City.find({ countryId });
};