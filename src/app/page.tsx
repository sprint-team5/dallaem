import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
// import getData from "./data";

const Home = () => {
  const queryClient = new QueryClient();
  // queryClient.prefetchQuery(getData);

  return (
    <main>
      메인 페이지 초기화
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/** 컴포넌트 예정 */}
      </HydrationBoundary>
    </main>
  );
};

export default Home;
