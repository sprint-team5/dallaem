import Image from "next/image"

import dayjs from "dayjs"

interface IGathering {
  teamId: number
  id: number
  name: string
  dateTime: string
  location: string
}

interface IUser {
  teamId: number
  id: number
  email: string
  name: string
}

interface IReviewProps {
  score: number
  image?: boolean
  comment: string
  createdAt: string
  Gathering: IGathering
  User?: IUser
}

const Review = ({ score, comment, createdAt, image, Gathering, User }: IReviewProps) => {
  return (
    <div className="flex flex-col gap-6 border-b-2 border-dashed border-gray-200 py-6 sm:flex-row">
      {image && (
        <div className="relative h-[156px] w-full flex-none rounded-3xl bg-gray-500 sm:w-[280px]">
          <Image
            className="object-cover object-center"
            src="/img/profile/defaultProfile.png"
            alt={`${Gathering.name} 모임 이미지`}
            fill
          />
        </div>
      )}

      <div>
        <div className="flex gap-1">
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return <span key={`score-${index + 1}`}>{index < score ? "❤️" : "🧩"}</span>
            })}
        </div>
        <h3 className="mt-[10px] break-keep text-sm font-medium leading-5">{comment}</h3>
        {Gathering && (
          <p className="mt-[10px] text-xs font-medium leading-4 text-gray-700">
            {Gathering.name} · {Gathering.location}
          </p>
        )}

        <div className="mt-2 flex items-center text-xs font-medium leading-4">
          {User && (
            <div className="flex items-center gap-2">
              <Image
                src="/img/profile/defaultProfile.png"
                width={24}
                height={24}
                alt="유저 이미지"
              />
              <p className="text-gray-700 after:ml-2 after:pr-3 after:content-['|']">럽윈즈올</p>
            </div>
          )}
          <p className="text-gray-500">{dayjs(createdAt).format("YYYY.MM.DD")}</p>
        </div>
      </div>
    </div>
  )
}

export default Review
