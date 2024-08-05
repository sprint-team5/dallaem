import Link from "next/link"

import Button from "@/components/public/button/Button"
import ROUTE from "@/constants/route"

const Home = () => {
  return (
    <main>
      <div className="flex h-[503px] w-[556px] flex-col items-center justify-between px-5 pb-16 pt-[108px] text-center">
        <h1 className="w-[340px] text-4xl font-extrabold leading-snug text-black">
          당신의 관심사, 5분만에 모임으로 만들어보세요!
        </h1>
        <h2 className="w-[370px] font-mono text-xl text-gray-500">
          취미부터 스터디까지, 원하는 모든 모임을 손쉽게 만들 수 있는 곳
        </h2>
        <div className="flex items-center justify-between gap-4">
          <Link href={ROUTE.SIGNIN}>
            <Button className="rounded-full" borderStyle="solid">
              로그인 하러가기
            </Button>
          </Link>
          <Link href={ROUTE.GATHERINGS}>
            <Button borderStyle="outlined">모임 둘러보기</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Home
