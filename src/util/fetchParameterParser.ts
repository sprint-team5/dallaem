export const convertParamsToQueryString = (params: object) => {
  const queryParams: Record<string, string> = Object.keys(params).reduce(
    (acc, key) => {
      const value = params[key as keyof typeof params]
      acc[key] = value ? String(value) : ""
      return acc
    },
    {} as Record<string, string>,
  )
  return new URLSearchParams(queryParams).toString()
}

// prefer-default-export 방지용 임시 함수
export const temp = () => {}
