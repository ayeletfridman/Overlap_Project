import axios from 'axios';
import Country from '../models/Country';

export const fetchCountries = async ()=>{
  console.log('Fetching from external API...');
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region');
      
     const countriesToSave = response.data.map((c: any) => ({
        name: c.name.common,
        flag: c.flags.png || c.flags.svg || '', 
        population: c.population,
        region: c.region
      }));
      await Country.deleteMany({});
    
      await Country.insertMany(countriesToSave);
      console.log('Countries fetch successfully!');
}