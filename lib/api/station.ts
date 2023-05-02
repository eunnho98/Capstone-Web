// 버스 정류장 정보
import { busAxios } from '.';

/**
 * 정류소 정보 검색, 도시 코드만 입력하면 그 도시의 전체 정류소 검색
 * @param cityCode 도시 코드
 * @param nodeNm 정류소명(option)
 * @param nodeNo 정류소번호(option)
 * @param pageNo 출력할 데이터 개수, default = 10
 */
export const getStationInfoAPI = async ({
  cityCode,
  pageNo = 10,
  nodeNm,
  nodeNo,
}: {
  cityCode: number;
  pageNo?: number;
  nodeNm?: string;
  nodeNo?: number;
}) => {
  let query = new URLSearchParams(
    `?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&numOfRows=${pageNo}&_type=json`,
  );
  if (nodeNm) {
    query.append('nodeNm', nodeNm);
  }
  if (nodeNo) {
    query.append('nodeNo', nodeNo.toString());
  }

  const { data } = await busAxios.get(
    'BusSttnInfoInqireService/getSttnNoList?' + query.toString(),
  );
  return data.response.body.items.item;
};

/**
 * 그 정류장으로 오는 버스 정보 검색, 버스 번호 및 종점, 기점 나타냄
 * @param cityCode 도시코드
 * @param nodeid 정류소 고유번호
 * @param pageNo 출력할 데이터 개수, default = 10
 */
export const getStationBusInfoAPI = async ({
  cityCode,
  nodeid,
  pageNo,
}: {
  cityCode: number;
  nodeid: string;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&nodeid=${nodeid}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};

/**
 * GPS좌표 기반 근처 500m 정류장 검색
 * @param lat 위도
 * @param long 경도
 */
export const getStationInfoByGPSAPI = async ({
  lat,
  long,
  pageNo,
}: {
  lat: number;
  long: number;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/BusSttnInfoInqireService/getSttnThrghRouteList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&gpsLati=${lat}&gpsLong=${long}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};
