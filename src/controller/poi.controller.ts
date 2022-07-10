import { Request, Response, Router } from 'express';
import { poiService } from '../service/poi.service';
import { OptimalPOIResponseDTO, RequestOptimalPOIDTO } from './dto/poi.dto';

const router = Router();

router.post('', async (req: Request, res: Response) => {
  const info: RequestOptimalPOIDTO = req.body;

  const poiList = await poiService.optimalPOI(info);
  res.status(200).send(poiList);
});

export { router as PrivacyRouter };
