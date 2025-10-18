"use client";

import DeviceItem from "../device-item/device-item";

export default function DeviceList() {
  return (
    <div className="grid gap-5 pb-10">
      {[1, 2, 3, 4, 5, 6, 7].map(num => (
        <DeviceItem key={num} />
      ))}
    </div>
  );
}
