import { Request, Response, Router } from 'express';
import { privacyService } from '../service/privacy.service';
import { OptimalPOIResponseDTO, RequestOptimalPOIDTO } from './dto/poi.dto';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  const info: RequestOptimalPOIDTO = req.body;

  const poiList = await privacyService.privacy(info);
  res.status(200).send(poiList);
});

export { router as PrivacyRouter };
