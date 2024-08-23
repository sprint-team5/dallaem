"use server"

import ImgLogin from "@/components/public/img/ImgLogin"
import { IAuthLayoutProps } from "@/types/auth/auth"

const authLayoutStyles = {
  container: {
    default: "w-full bg-slate-100",
    mobile: "min-h-[906px] pt-[33px] pb-[72px]",
    tablet: "md:min-h-[1133px] md:pt-10 md:pb-[162px]",
    desktop: "2xl:min-h-[1080px] 2xl:py-[153px]",
  },
  wrapper: {
    default: "flex flex-col items-center justify-center",
    mobile: "",
    tablet: "",
    desktop: "2xl:flex-row 2xl:gap-[102px]",
  },
  img: {
    default: "mt-6",
    mobile: "h-[226px] w-[290px]",
    tablet: "md:h-[337px] md:w-[407px]",
    desktop: "2xl:mt-0 2xl:h-[486px] 2xl:w-[588px]",
  },
}

const containerStyles = `${authLayoutStyles.container.default} ${authLayoutStyles.container.mobile} ${authLayoutStyles.container.tablet} ${authLayoutStyles.container.desktop}`
const wrapperStyles = `${authLayoutStyles.wrapper.default} ${authLayoutStyles.wrapper.mobile} ${authLayoutStyles.wrapper.tablet} ${authLayoutStyles.wrapper.desktop}`
const imgStyles = `${authLayoutStyles.img.default} ${authLayoutStyles.img.mobile} ${authLayoutStyles.img.tablet} ${authLayoutStyles.img.desktop}`

async function AuthArticle({ children }: IAuthLayoutProps) {
  return (
    <div className={containerStyles}>
      <div className={wrapperStyles}>
        <div className="flex flex-col items-center justify-center text-[#1F2937]">
          <span className="font-semibold">Welcome to 같이 달램!</span>
          <span className="mt-2 font-medium">바쁜 일상 속 잠깐의 휴식,</span>
          <span className="font-medium"> 이제는 같이 달램과 함께 해보세요</span>
          <ImgLogin className={imgStyles} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default AuthArticle
