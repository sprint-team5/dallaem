"use client";

import { useRouter } from "next/navigation";

const ProfileEditBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    // fixme: 경로 수정 필요
    router.push("/");
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="size-8 rounded-full bg-editBtn bg-no-repeat bg-cover border-none"
    >
      {" "}
    </button>
  );
};

export default ProfileEditBtn;
