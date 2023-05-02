// ? todo 버스 위치 정보

import { busAxios } from '.';

/**
 * @gpslati 위도
 * @gpslong 경도
 * @routenm 버스번호
 * @nodenm 정류소명
 */
interface IBusLocationStation {
  gpslati: number;
  gpslong: number;
  routenm: number;
  nodenm: string;
}

/**
 * @vehicleno 차량번호
 */
interface IBusLocation extends IBusLocationStation {
  vehicleno: string;
}

/**
 * 노선별 버스위치 목록 조회
 * @param cityCode 도시코드
 * @param routedId 각 버스의 고유한 ID
 */
export const busLocationAPI = ({
  cityCode,
  routeId,
  pageNo = 10,
}: {
  cityCode: number;
  routeId: string;
  pageNo: number;
}) =>
  busAxios.get<IBusLocation>(
    `/BusLcInfoInqireService/getRouteAcctoBusLcList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&routeId=${routeId}&numOfRows=${pageNo}&_type=json`,
  );

/**
 * 노선별 특정 정류소 접근 버스 위치 정보 조회
 * @param cityCode 도시코드
 * @param routedId 각 버스의 고유한 ID
 * @param nodeId 각 정류장의 고유한 ID
 */
export const busLocationStationAPI = ({
  cityCode,
  routeId,
  nodeId,
}: {
  cityCode: number;
  routeId: string;
  nodeId: string;
}) =>
  busAxios.get<IBusLocationStation>(
    `/BusLcInfoInqireService/getRouteAcctoSpcifySttnAccesBusLcInfo?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&routeId=${routeId}&nodeId=${nodeId}&_type=json`,
  );
