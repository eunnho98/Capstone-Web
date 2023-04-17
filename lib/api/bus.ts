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
  cityCode: string | number;
  pageNo: number;
}) => {
  const { data } = await busAxios.get(
    `/BusRouteInfoInqireService/getRouteNoList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&numOfRows=${pageNo}&_type=json`,
  );
  return data.response.body.items.item;
};
