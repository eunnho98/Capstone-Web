import { busAxios } from '.';

/**
 * 도시코드 반환
 */
export const getStationBusInfoAPI = async () => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getCtyCodeList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&_type=json`,
  );
  return data.response.body.items.item;
};
