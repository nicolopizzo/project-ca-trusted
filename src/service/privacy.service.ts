import { OptimalPOIResponseDTO, RequestOptimalPOIDTO } from '../controller/dto/poi.dto';
const axios = require('axios').default;
//import fetch from 'node-fetch';
//const fetch = () => import('node-fetch').then(({default: fetch}) => fetch());

class PrivacyService {
  public async perturbation(info: RequestOptimalPOIDTO): Promise<unknown> {
    
    let returnedPois;

    info.position[0] = parseFloat(info.position[0].toFixed(info.dummyOrPerturbationDigits));
    info.position[1] = parseFloat(info.position[1].toFixed(info.dummyOrPerturbationDigits));

    const body = JSON.stringify({
      minRank: info.minRank,
      type: info.type,
      positions: [
        {
          latitude: info.position[0],
          longitude: info.position[1],
        }
      ]
    });

    axios({
      method: 'post',
      url: 'http://localhost:3001/poi/optimal',
      data: body,
    })
      .then(function (response: any) {
        //console.log(response);
        returnedPois = response.data;
      });

    /*
    const optimalPoi = await fetch('http://localhost:3001/poi/optimal', {
      method: 'POST',
      body: body
    });
    

    let returnedPois = await optimalPoi.json();
    */

    console.log(returnedPois);
    
    return returnedPois;
  }

  public async dummy(info: RequestOptimalPOIDTO): Promise<OptimalPOIResponseDTO[] | unknown> {
    let returnedPois;

    const rightResponseIndex = Math.random() * (info.dummyOrPerturbationDigits - 1);

    for (let dummyUpdate = 0; dummyUpdate < info.dummyOrPerturbationDigits; dummyUpdate++) {
      let body;
      let latitude;
      let longitude;
      if (dummyUpdate === rightResponseIndex) {
        latitude = info.position[0],
        longitude = info.position[1]
      } else {
        latitude = Math.random() * ( (info.position[0] + 0.005) - (info.position[0] - 0.005)) + (info.position[0] - 0.005),
        longitude = Math.random() * ( (info.position[1] + 0.005) - (info.position[1] - 0.005)) + (info.position[1] - 0.005)
      }

      body = JSON.stringify({
        minRank: info.minRank,
        type: info.type,
        positions: [{
          latitude: latitude,
          longitude: longitude
        }]
      });

      axios({
        method: 'post',
        url: 'http://localhost:3001/poi/optimal',
        data: body,
      })
        .then(function (response: any) {
          //console.log(response);
          if (dummyUpdate === rightResponseIndex) {
            returnedPois = response.data;
          }
        });

      /*
      var optimalPoi = await fetch('http://localhost:3001/poi/optimal', {
        method: 'POST',
        body: body
      });

      if (dummyUpdate === rightResponseIndex) {
        returnedPois = await optimalPoi.json();
      }
      */

    }
    
    console.log(returnedPois);

    return returnedPois;
  }

  public async privacy(info: RequestOptimalPOIDTO): Promise<OptimalPOIResponseDTO[] | unknown> {
    //let returnedPois: OptimalPOIResponseDTO = { items: [] };
    let returnedPois;

    if (info.privacy === 'dummy') {
      returnedPois = await this.dummy(info);
    } else if (info.privacy === 'perturbation') {
      returnedPois = await this.perturbation(info);
    } else {
      throw new Error('Invalid privacy type');
    }

    return returnedPois;
  }
}

export const privacyService = new PrivacyService();
