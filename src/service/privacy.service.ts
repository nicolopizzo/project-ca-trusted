import {
  RequestOptimalPOIDTO,
  IPosition,
  OptimalPOIResponseDTO,
  POIItemDTO,
} from '../controller/dto/poi.dto';

class PrivacyService {
  public perturbation(info: RequestOptimalPOIDTO): IPosition[] {
    let returnedPositions: IPosition[] = [];

    returnedPositions.push({
      latitude: parseFloat(info.position[0].toFixed(info.dummyOrPerturbationDigits)),
      longitude: parseFloat(info.position[1].toFixed(info.dummyOrPerturbationDigits)),
    });

    return returnedPositions;
  }

  public correctDummy(pois: OptimalPOIResponseDTO, position: IPosition): POIItemDTO | undefined {
    for (let poi of pois.items) {
      if (
        poi.position.latitude === position.latitude &&
        poi.position.longitude === position.longitude
      ) {
        return poi;
      }
    }

    return undefined;
  }

  public dummy(info: RequestOptimalPOIDTO): IPosition[] {
    let returnedPositions: IPosition[] = [];
    const perturbation = 0.005;

    const rightResponseIndex = parseInt(
      (Math.random() * (info.dummyOrPerturbationDigits - 1)).toFixed(0)
    );

    for (let dummyUpdate = 0; dummyUpdate < info.dummyOrPerturbationDigits; dummyUpdate++) {
      let latitude;
      let longitude;
      if (dummyUpdate === rightResponseIndex) {
        (latitude = info.position[0]), (longitude = info.position[1]);
      } else {
        latitude = info.position[0] - perturbation + Math.random() * (2 * perturbation);
        longitude = info.position[1] - perturbation + Math.random() * (2 * perturbation);
      }

      returnedPositions.push({
        latitude,
        longitude,
      });
    }

    return returnedPositions;
  }

  public privacy(info: RequestOptimalPOIDTO): IPosition[] {
    let returnedPositions: IPosition[] = [];

    if (info.privacy === 'dummy') {
      returnedPositions = this.dummy(info);
    } else if (info.privacy === 'perturbation') {
      returnedPositions = this.perturbation(info);
    } else {
      throw new Error('Invalid privacy type');
    }

    return returnedPositions;
  }
}

export const privacyService = new PrivacyService();
