import { Router } from 'express';
import * as controller from '../controllers/countryController';

const router = Router();

router.get('/', controller.getAllCountries);
router.get('/seed', controller.seedCountries);
router.get('/reset', controller.resetCountries);
router.get('/:id', controller.getCountryById);
router.post('/', controller.createCountry);
router.put('/:id', controller.updateCountry);
router.delete('/:id', controller.deleteCountry);

export default router;