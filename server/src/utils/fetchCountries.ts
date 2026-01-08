import axios from 'axios';
import Country from '../models/Country';
export const fetchCountries = async () => {
  try {
    console.log('Fetching from external API...');
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
    
    const ops = response.data.map((c: any) => ({
      updateOne: {
        filter: { name: c.name.common },
        update: { 
          name: c.name.common,
          flag: c.flags.png || c.flags.svg || '',
          population: c.population,
          region: c.region
        },
        upsert: true 
      }
    }));

    await Country.bulkWrite(ops);
    console.log('Bulk update finished!');
    return await Country.find({});
    return await Country.find({}).sort({ name: 1 });
  } catch (error) {
    console.error('Error in fetchCountries:', error);
    throw error;
  }
}