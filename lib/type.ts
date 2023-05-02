/**
 * @endnodenm 종점
 * @startnodenm 기점
 * @endvehicletime 막차시간
 * @startvehicletime 첫차시간
 * @routeId 노선ID(버스고유 ID)
 * @routeno 노선번호(버스번호)
 *
 */
export interface IGetAllBusNumber {
  endnodenm: string;
  startnodenm: string;
  endvehicletime: string | number;
  startvehicletime: string | number;
  routeId: string;
  routeno: string;
}

/**
 * getStationBusInfoAPI, getStationInfoAPI
 * @gpslati 위도
 * @gpslong 경도
 * @nodeid 정류소 ID
 * @nodenm 정류소명
 * @citycode 도시코드
 */
export interface IGetStationInfo {
  gpslati: string;
  gpslong: string;
  nodeid: string;
  nodenm: string;
  citycode: string;
}

/**
 * @endnodenm 종점
 * @startnodenm 기점
 * @routeId 노선ID(버스고유 ID)
 * @routeno 노선번호(버스번호)
 */
export interface IGetBusInfo {
  routeId: string;
  routeno: string;
  endnodenm: string;
  startnodenm: string;
}

/**
 * getBusArriveInfoAPI
 * @nodenm 정류소이름
 * @routeid 버스 고유 ID
 * @routeno 버스번호
 * @arrprevstationcnt 남은 정류장 수
 * @arrtime 남은시간(초)
 */
export interface IGetArriveInfo {
  nodenm: string;
  routeid: string;
  routeno: number;
  arrprevstationcnt: number;
  arrtime: number;
}
