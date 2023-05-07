import { Box, Button } from '@chakra-ui/react';
import { getBusInfoAPI } from '@/lib/api/bus';
import { useQuery } from 'react-query';
import useMap from '@/lib/hooks/useMap';

// export default function Home() {
//   const { data, refetch, isLoading } = useQuery(
//     'allBus',
//     // 파라미터를 주기 위해서
//     () => getBusInfoAPI({ cityCode: 25, routeId: 'DJB30300004' }),
//   );

//   const handleBtn = () => {
//     refetch();
//   };
//   if (isLoading) {
//     return <h2>loading...</h2>;
//   }
//   return (
//     <div>
//       <Button onClick={handleBtn}>sdf</Button>
//       <div>{JSON.stringify(data)}</div>
//     </div>
//   );
// }

export default function Home() {
  useMap();
  return (
    <div>
      <Box id="map" w="800px" h="600px"></Box>
      <p>sssdf</p>
    </div>
  );
}
