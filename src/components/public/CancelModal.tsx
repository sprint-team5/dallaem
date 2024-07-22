import CloseIcon from "@/public/icon/closeIcon.svg";
import { ReactNode } from "react";

interface ICancelModalProps {
  children: ReactNode;
  isOneBtn: boolean;
}

const CancelModal = ({ children, isOneBtn = true }: ICancelModalProps) => {
  return (
    <div className="p-6 flex flex-col justify-around items-center w-cancel mx-auto shadow-md rounded-lg">
      <CloseIcon fill="true" className="self-end" />
      <div className="mt-6 mb-10">
        <p>{children}</p>
      </div>
      <div
        className={`flex gap-3 self-stretch ${
          isOneBtn ? "justify-end" : "justify-center"
        }`}
      >
        {!isOneBtn && (
          <button
            type="button"
            className="w-1/3 border-2 py-2.5 rounded-xl border-orange-600 text-orange-600 hover:border-orange-500 hover:text-orange-500"
          >
            취소
          </button>
        )}
        <button
          type="button"
          className="bg-orange-600 text-white w-1/3 py-2.5 rounded-xl hover:bg-orange-700"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CancelModal;
