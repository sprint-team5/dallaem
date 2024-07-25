"use client"

import Input from "@/components/public/input/Input"

const Home = () => {
  const onChange = () => {}

  const onSelect = () => {}

  return (
    <main className="bg-slate-400">
      메인 페이지 초기화
      <Input
        className=""
        state="error"
        size="large"
        onChange={onChange}
        placeholder="테스트 메시지222222"
        errorMessage="error message"
      />
      <Input
        className=""
        state="error"
        size="large"
        isPassword
        onChange={onChange}
        placeholder="테스트 메시지222222"
        errorMessage="error message"
      />
      <Input
        className=""
        state="toggle"
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
