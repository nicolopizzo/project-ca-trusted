import axios from 'axios';
import {
  IPosition,
  OptimalPOIResponseDTO,
  POIItemDTO,
  POIResponseDTO,
  RequestOptimalPOIDTO,
} from '../controller/dto/poi.dto';
import { privacyService } from '../service/privacy.service';

class POIService {
  public async optimalPOI(info: RequestOptimalPOIDTO): Promise<OptimalPOIResponseDTO> {
    const privacyPositions: IPosition[] = privacyService.privacy(info);

    const body = JSON.stringify({
      minRank: info.minRank,
      type: info.type,
      positions: privacyPositions,
    });

    const axiosTest = async () => {
      try {
        const { data: response } = await axios.post('http://localhost:3001/poi/optimal', body, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'json',
        });
        const axiosResponse = response;

        if (info.privacy === 'perturbation') {
          return { items: [axiosResponse.items[0]] };
        } else {
          const latitude = info.position[0];
          const longitude = info.position[1];
          return { items: [privacyService.correctDummy(axiosResponse, { latitude, longitude })] };
        }
      } catch (error) {
        return {} as OptimalPOIResponseDTO;
      }
    };

    return await axiosTest();
  }
}

export const poiService = new POIService();
