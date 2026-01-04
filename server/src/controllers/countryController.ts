import { Request, Response, NextFunction } from 'express';
import * as countryService from '../services/countryService';
import { catchAsync } from '../utils/catchAsync';

export const getAllCountries = catchAsync(async (req: Request, res: Response) => {
    const data = await countryService.getAllCountriesFromDB();
    res.json(data);
});

export const createCountry = catchAsync(async (req: Request, res: Response) => {
    const newData = await countryService.createNewCountryInDB(req.body);
    res.status(201).json(newData);
});

export const updateCountry = catchAsync(async (req: Request, res: Response) => {
    const updated = await countryService.updateCountryInDB(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: 'Country not found for update' });
    }
    res.json(updated);
});

export const deleteCountry = catchAsync(async (req: Request, res: Response) => {
    const deleted = await countryService.deleteCountryFromDB(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: 'Country not found for deletion' });
    }
    res.json({ message: 'Deleted successfully' });
});

export const getCountryById = catchAsync(async (req: Request, res: Response) => {
    const country = await countryService.getCountryByIdFromDB(req.params.id);
    if (!country) {
        return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
});

export const seedCountries = catchAsync(async (req: Request, res: Response) => {
    await countryService.fetchAndStoreCountries();
    res.json({ message: 'External countries sync completed' });
});

export const resetCountries = catchAsync(async (req: Request, res: Response) => {
    await countryService.resetCountries();
    res.json({ message: 'Database reset and sync completed' });
});