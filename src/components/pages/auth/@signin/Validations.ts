const validations = {
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
  },
}

export default validations
