import ImgLogin from "@/components/public/img/ImgLogin"

import FormComponent from "./FormComponent"

const signinPageStyles = {
  constainer: {
    default: "w-full bg-slate-100",
    mobile: "min-h-[1168px] pt-[33px] pb-[58px]",
    tablet: "md:min-h-[1343px] md:pt-10 md:pb-[84px]",
    desktop: "2xl:min-h-[1080px] 2xl:py-[185px]",
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

const containerStyles = `${signinPageStyles.constainer.default} ${signinPageStyles.constainer.mobile} ${signinPageStyles.constainer.tablet} ${signinPageStyles.constainer.desktop}`
const wrapperStyles = `${signinPageStyles.wrapper.default} ${signinPageStyles.wrapper.mobile} ${signinPageStyles.wrapper.tablet} ${signinPageStyles.wrapper.desktop}`
const imgStyles = `${signinPageStyles.img.default} ${signinPageStyles.img.mobile} ${signinPageStyles.img.tablet} ${signinPageStyles.img.desktop}`

const SigninPage = () => {
  return (
    <div className={containerStyles}>
      <div className={wrapperStyles}>
        <div className="flex flex-col items-center justify-center text-[#1F2937]">
          <span className="font-semibold">Welcome to 같이 달램!</span>
          <span className="mt-2 font-medium">바쁜 일상 속 잠깐의 휴식,</span>
          <span className="font-medium"> 이제는 같이 달램과 함께 해보세요</span>
          <ImgLogin className={imgStyles} />
        </div>
        <FormComponent />
      </div>
    </div>
  )
}

export default SigninPage
