import logOut from "@/lib/logout"

const LogoutBtn = () => {
  return (
    <form action={logOut}>
      <button type="submit" className="rounded-full bg-gray-100 px-3 py-1 text-gray-400">
        로그아웃
      </button>
    </form>
  )
}

export default LogoutBtn
