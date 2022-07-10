enum POIType {
  HISTORICAL_BUILDING = 'historical building',
  PARK = 'park',
  THEATER = 'theater',
  MUSEUM = 'museum',
  DEPARTMENT = 'department',
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface RequestOptimalPOIDTO {
  position: number[];
  privacy: string;
  minRank: number;
  type: POIType;
  dummyOrPerturbationDigits: number;
}

export class OptimalPOIResponseDTO {
  items: POIItemDTO[];
}

export interface POIResponseDTO {
  id: number;
  name: string;
  position: IPosition;
  type: POIType;
  rank: number;
}

export class POIItemDTO {
  position: IPosition;
  poi: POIResponseDTO;
}
