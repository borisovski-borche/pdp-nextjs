"use client";

import { fetchAllDevices } from "@/services/devices.service";
import DeviceItem from "../device-item/device-item";

export default function DeviceList() {
  const devices = fetchAllDevices();

  return (
    <div className="grid gap-5 pb-10">
      {devices.map(device => (
        <DeviceItem device={device} key={device.uid} />
      ))}
    </div>
  );
}
