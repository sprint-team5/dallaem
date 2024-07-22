import CheckSVG from "@/public/icon/check.svg";

interface ICheckProps {
  className: string;
}

const ArrowRight = ({ className }: ICheckProps) => {
  const newClassName = `${className} w-4 h-4 text-[#F97316]`;
  return (
    <div>
      <CheckSVG className={newClassName} />
    </div>
  );
};

export default ArrowRight;
