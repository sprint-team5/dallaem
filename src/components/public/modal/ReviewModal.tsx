import CloseBtn from "../CloseBtn"

const ReviewModal = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server"

    // fixme : 제출 처리 수정 필요

    const review = formData.get("review")
    console.log(review)
  }

  return (
    <form
      action={handleSubmit}
      className="w-modal-md lg:w-modal-lg mx-auto rounded-md p-6 shadow-xl"
    >
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">리뷰쓰기</h3>
        <CloseBtn />
      </div>
      <div className="my-6">
        <p className="font-semibold">만족스러운 경험이었나요?</p>
        <div>♥︎ ♥︎ ♥︎ ♥︎ ♥︎</div>
      </div>
      <div>
        <p className="mb-3 font-semibold">경험에 대해 남겨주세요.</p>
        <textarea
          name="review"
          rows={5}
          className="w-full resize-none rounded-xl bg-gray-50 px-4 py-2.5"
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
        />
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          className="active: w-1/2 rounded-xl border border-orange-600 py-2.5 text-orange-600 hover:border-orange-500 hover:text-orange-500 active:border-orange-700 active:text-orange-700"
        >
          취소
        </button>
        <button
          type="submit"
          className="w-1/2 rounded-xl bg-gray-400 py-2.5 text-white hover:bg-gray-500 active:bg-gray-600"
        >
          리뷰 등록
        </button>
      </div>
    </form>
  )
}

export default ReviewModal
