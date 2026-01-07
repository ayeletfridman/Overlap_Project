import { Request, Response } from 'express';
import * as cityService from '../services/cityService';
import { catchAsync } from '../utils/catchAsync';

export const updateCityName = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id; 
  const { name }: { name: string } = req.body;

  const updated = await cityService.updateCity(id, name);
  
  if (!updated) {
    return res.status(404).json({ message: 'העיר לא נמצאה' });
  }

  res.json(updated);
});

export const removeCity = catchAsync(async (req: Request, res: Response) => {
  await cityService.deleteCity(req.params.id);
  res.status(204).send();
});