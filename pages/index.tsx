import { Button } from '@chakra-ui/react';
import { getAllBusNumberAPI } from '@/lib/api/bus';
import { IGetAllBusNumber } from '@/lib/type';
import { useQuery } from 'react-query';

export default function Home() {
  const { data, refetch, isLoading } = useQuery(
    'allBus',
    // 파라미터를 주기 위해서
    () => getAllBusNumberAPI({ cityCode: 26, pageNo: 20 }),
  );

  const handleBtn = () => {
    refetch();
  };
  if (isLoading) {
    return <h2>loading...</h2>;
  }
  return (
    <div>
      <Button onClick={handleBtn}>sdf</Button>;
      {data.map((bus) => (
        <li key={bus.routeId}>{bus.startnodenm}</li>
      ))}
    </div>
  );
}
