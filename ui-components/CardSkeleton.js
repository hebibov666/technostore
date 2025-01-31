export default function CardSkeleton() {
    return (
      <div className="w-full flex flex-col gap-[10px] h-[320px] bg-white rounded-[7px]">
        <div className="w-full h-[50%] flex justify-center items-center">
          <div className="w-full h-full bg-gray-300 animate-pulse rounded-[5px]" />
        </div>
        <div className="flex flex-col gap-[10px] p-[10px]">
          <div className="w-3/4 h-[20px] bg-gray-300 animate-pulse rounded-[5px]" />
          <div className="w-1/2 h-[20px] bg-gray-300 animate-pulse rounded-[5px]" />
          <div className="w-full h-[35px] bg-gray-300 animate-pulse rounded-[5px]" />
        </div>
      </div>
    );
  }
  