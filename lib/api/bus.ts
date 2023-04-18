import { busAxios } from '.';

/**
 * 도시 코드를 입력하면 그 도시의 모든 버스를 pageNo만큼 가져옴
 * @param cityCode 도시코드
 * @param pageNo 데이터를 가져올 수, default=10
 */
export const getAllBusNumberAPI = async ({
  cityCode,
  pageNo = 10,
}: {
  cityCode: number;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getRouteNoList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};

/**
 * 도시 코드와 버스 번호를 입력하면 그 번호가 포함된 도시의 버스를 가져옴
 * @param cityCode 도시코드
 * @param routeNo 버스번호
 * @param pageNo 데이터를 가져올 수, default = 10
 */
export const getBusNumberAPI = async ({
  cityCode,
  routeNo,
  pageNo = 10,
}: {
  cityCode: number;
  routeNo: number;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getRouteNoList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&routeNo=${routeNo}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};

/**
 * 도시 코드와 버스 ID를 입력하면 그 버스의 노선을 알려줌, 정류소명, 정류소 좌표 등
 * @param cityCode 도시코드
 * @param routeId 버스 고유 ID
 */
export const getBusRouteAPI = async ({
  cityCode,
  routeId,
  pageNo = 10,
}: {
  cityCode: number;
  routeId: string;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getRouteAcctoThrghSttnList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&routeId=${routeId}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};

/**
 * 도시 코드와 버스 ID를 입력하면 그 버스에 대한 정보를 알려줌
 * @param cityCode 도시 코드
 * @param routeId 버스 고유 ID
 * @returns {Object} 객체를 반환함
 */
export const getBusInfoAPI = async ({
  cityCode,
  routeId,
}: {
  cityCode: number;
  routeId: string;
}) => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getRouteInfoIem?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&routeId=${routeId}&_type=json`,
  );
  return data.response.body.items.item;
};
