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
    let privacyPositions: IPosition[] = [];

    if (info.privacy === 'noPrivacy') {
      privacyPositions.push({
        latitude: info.position[0],
        longitude: info.position[1],
      });
    } else {
      privacyPositions = privacyService.privacy(info);
    }

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

        if (info.privacy === 'dummy') {
          const latitude = info.position[0];
          const longitude = info.position[1];
          return { items: [privacyService.correctDummy(axiosResponse, { latitude, longitude })] };
        } else {
          return { items: [axiosResponse.items[0]] };
        }
      } catch (error) {
        return {} as OptimalPOIResponseDTO;
      }
    };

    return await axiosTest();
  }
}

export const poiService = new POIService();
