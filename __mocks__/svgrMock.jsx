// module.exports = "SvgrMock"
// named svg 파일을 ReactComponent의 형태로 대신 import 해올 때 사용하는 코드입니다.
// import { ReactComponent as SVGName } from '/src/SVGName.svg'의 형태로 불러올 때 사용됩니다.
import React from "react"

const SvgrMock = React.forwardRef(() => {
  return <svg data-testid="mocked-svg" />
})

SvgrMock.displayName = "SvgrMock"

// export const ReactComponent = SvgrMock
export default SvgrMock
