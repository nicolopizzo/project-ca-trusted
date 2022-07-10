import axios from 'axios';
import { IPosition, OptimalPOIResponseDTO, RequestOptimalPOIDTO } from '../controller/dto/poi.dto';
import { privacyService } from '../service/privacy.service';

class POIService {
  public async optimalPOI(info: RequestOptimalPOIDTO): Promise<OptimalPOIResponseDTO> {
    let returnedPois: OptimalPOIResponseDTO = { items: [] };

    let privacyPositions: IPosition[] = privacyService.privacy(info);

    let body = JSON.stringify({
      minRank: info.minRank,
      type: info.type,
      positions: privacyPositions,
    });

    let axiosResponse;
    const axiosTest = async () => {
      try {
        const { data: response } = await axios.post('http://localhost:3001/poi/optimal', body, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'json',
        });
        axiosResponse = response;

        if (info.privacy === 'perturbation') {
          return { items: [axiosResponse.items[0]] };
        } else {
          for (let poiItem of axiosResponse.items) {
            if (
              poiItem.position.latitude == info.position[0] &&
              poiItem.position.longitude == info.position[1]
            ) {
              return { items: [poiItem] };
            }
          }
        }

        return {} as OptimalPOIResponseDTO;
      } catch (error) {
        return {} as OptimalPOIResponseDTO;
      }
    };

    return await axiosTest();
  }
}

export const poiService = new POIService();
