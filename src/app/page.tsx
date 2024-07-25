"use client"

import InputField from "@/components/public/input/InputField"

const Home = () => {
  const onChange = () => {}

  const onSelect = () => {}

  return (
    <main className="bg-slate-400">
      메인 페이지 초기화
      <InputField
        className=""
        inputType="input"
        size="large"
        onChange={onChange}
        placeholder="테스트 메시지222222"
        errorMessage="error message"
      />
      <InputField
        className=""
        inputType="input"
        size="large"
        isPassword
        onChange={onChange}
        placeholder="테스트 메시지222222"
        errorMessage="error message"
      />
      <InputField
        className=""
        inputType="dropdown"
        size="large"
        onChange={onChange}
        placeholder="테스트 메시지222222"
        errorMessage="error message"
        options={["a", "b", "c", "d"]}
        onSelect={onSelect}
      />
    </main>
  )
}

export default Home
