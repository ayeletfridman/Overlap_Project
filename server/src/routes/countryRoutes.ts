import { Router } from 'express';
import * as controller from '../controllers/countryController';
import { protect } from '../middlewares/authMiddleware';
const router = Router();

router.get('/', protect,controller.getAllCountries);
router.get('/seed', controller.seedCountries);
router.get('/reset', controller.resetCountries);
router.get('/:id', controller.getCountryById);
router.post('/', controller.createCountry);
router.put('/:id', controller.updateCountry);
router.delete('/:id',protect, controller.deleteCountry);

export default router;