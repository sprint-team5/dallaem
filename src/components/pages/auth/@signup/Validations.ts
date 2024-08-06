const validations = {
  name: {
    required: "이름을 입력해주세요.",
  },
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형식이 아닙니다.",
    },
  },
  companyName: {
    required: "회사명을 입력해주세요.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
  },
  passwordConfirm: {
    required: "비밀번호를 다시 한번 입력해주세요.",
    validate: (value: string, formValues: { password: string }) => {
      return value === formValues.password || "비밀번호가 일치하지 않습니다."
    },
  },
}

export default validations
