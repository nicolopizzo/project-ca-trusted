import { RequestOptimalPOIDTO, IPosition } from '../controller/dto/poi.dto';

class PrivacyService {
  public perturbation(info: RequestOptimalPOIDTO): IPosition[] {
    let returnedPositions: IPosition[] = [];

    returnedPositions.push({
      latitude: parseFloat(info.position[0].toFixed(info.dummyOrPerturbationDigits)),
      longitude: parseFloat(info.position[1].toFixed(info.dummyOrPerturbationDigits)),
    });

    return returnedPositions;
  }

  public dummy(info: RequestOptimalPOIDTO): IPosition[] {
    let returnedPositions: IPosition[] = [];

    const rightResponseIndex = parseInt(
      (Math.random() * (info.dummyOrPerturbationDigits - 1)).toFixed(0)
    );

    for (let dummyUpdate = 0; dummyUpdate < info.dummyOrPerturbationDigits; dummyUpdate++) {
      let latitude;
      let longitude;
      if (dummyUpdate === rightResponseIndex) {
        (latitude = info.position[0]), (longitude = info.position[1]);
      } else {
        (latitude =
          Math.random() * (info.position[0] + 0.005 - (info.position[0] - 0.005)) +
          (info.position[0] - 0.005)),
          (longitude =
            Math.random() * (info.position[1] + 0.005 - (info.position[1] - 0.005)) +
            (info.position[1] - 0.005));
      }
      returnedPositions.push({
        latitude: latitude,
        longitude: longitude,
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
