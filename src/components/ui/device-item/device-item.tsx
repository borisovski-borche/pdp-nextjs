"use client";

export default function DeviceItem() {
  return (
    <div className="grid grid-cols-[30%_70%] min-h-[300] p-4 bg-green-300 shadow-[5px_5px] shadow-green-800 rounded-xl">
      <div>//Image goes here</div>
      <div className="border-l-2 border-l-green-800 px-3">
        //Details go here
      </div>
    </div>
  );
}
