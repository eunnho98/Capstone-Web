// 버스 도착 정보
import { busAxios } from '.';

/**
 * 그 정류소로 버스들이 몇초뒤에 들어오는지 나타냄
 * @param cityCode 도시코드
 * @param nodeId 정류소 고유ID
 */
export const getBusArriveInfoAPI = async ({
  cityCode,
  nodeId,
  pageNo,
}: {
  cityCode: number;
  nodeId: string;
  pageNo?: number;
}) => {
  const { data } = await busAxios.get(
    `/ArvlInfoInqireService/getSttnAcctoArvlPrearngeInfoList?serviceKey=${process.env.NEXT_PUBLIC_BUS_APIKEY}&cityCode=${cityCode}&nodeId=${nodeId}&numOfRows=${pageNo}&_type=json`,
  );

  return data.response.items.item;
};
