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
