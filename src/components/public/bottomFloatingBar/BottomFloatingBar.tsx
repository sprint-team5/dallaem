"use client"

import Button from "@/components/public/button/Button"

const floatingBarStyles = {
  container: {
    default:
      "fixed bottom-0 flex items-center justify-center w-full border-t-2 border-[#111827] bg-white",
    mobile: "h-[136px] px-4 py-5",
    tablet: "md:h-[86px] md:px-6",
    desktop: "2xl:px-[380px]",
  },
  wrapper: {
    default: {
      true: "flex h-full w-full flex-col items-center justify-between gap-[10px]",
      false: "flex h-full w-full flex-row items-center justify-between gap-[10px]",
    },
    mobile: "",
    tablet: "md:flex-row md:gap-[164px]",
    desktop: "",
  },
}

const isHostStyles = {
  button: {
    container: {
      true: "flex w-full gap-2 md:w-[238px]",
      false: "w-[115px]",
    },
  },
}

const isHostText = {
  text: {
    default: "더 건강한 나와 팀을 위한 프로그램 🏃‍️️",
    true: "모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요",
    false: "국내 최고 웰니스 전문가와 프로그램을 통해 지친 몸과 마음을 회복해봐요",
  },
  button: {
    default: "취소하기",
    true: "공유하기",
    false: "참여하기",
  },
}

const containerStyles = `${floatingBarStyles.container.default} ${floatingBarStyles.container.mobile} ${floatingBarStyles.container.tablet} ${floatingBarStyles.container.desktop}`

interface IButtonFloatingBarProps {
  isHost: boolean
}

const BottomFloatingBar = ({ isHost }: IButtonFloatingBarProps) => {
  const wrapperStyles = `${isHost ? floatingBarStyles.wrapper.default.true : floatingBarStyles.wrapper.default.false} ${floatingBarStyles.wrapper.mobile} ${floatingBarStyles.wrapper.tablet} ${floatingBarStyles.wrapper.desktop}`

  const onClickCancel = () => {}
  const onClickShare = () => {}
  const onClickParticipate = () => {}

  return (
    <>
      <div className="w-full border-t-2 border-[#111827]" />
      <div className={containerStyles}>
        <div className={wrapperStyles}>
          <div className="h-11 w-full whitespace-nowrap">
            <span className="font-semibold text-[#111827]">{isHostText.text.default}</span>
            <br />
            <span className="font-medium text-[#374151]">
              {isHost ? isHostText.text.true : isHostText.text.false}
            </span>
          </div>
          <div
            className={
              isHost ? isHostStyles.button.container.true : isHostStyles.button.container.false
            }
          >
            {isHost && (
              <Button className="" borderStyle="outlined" onClick={onClickCancel}>
                {isHostText.button.default}
              </Button>
            )}
            <Button
              className=""
              borderStyle="solid"
              onClick={isHost ? onClickShare : onClickParticipate}
            >
              {isHost ? isHostText.button.true : isHostText.button.false}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomFloatingBar
