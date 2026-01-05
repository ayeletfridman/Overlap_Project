import { Router } from 'express';
import * as controller from '../controllers/countryController';
import { protect } from '../middlewares/authMiddleware';
const router = Router();

router.get('/', protect,controller.getAllCountries);
router.get('/seed', protect,controller.seedCountries);
router.get('/reset', protect,controller.resetCountries);
router.get('/:id', protect,controller.getCountryById);
router.post('/', protect,controller.createCountry);
router.put('/:id', protect,controller.updateCountry);
router.delete('/:id',protect, controller.deleteCountry);

export default router;