"use client";

import { fetchAllDevices } from "@/services/devices.service";
import DeviceItem from "../device-item/device-item";
import { useEffect } from "react";
import { useDevicesStore } from "@/stores/devices.store";

export default function DeviceList() {
  const devices = useDevicesStore(state => state.devices);

  useEffect(() => {
    fetchAllDevices();
  }, []);

  return (
    <div className="grid gap-5 pb-10">
      {devices.map(device => (
        <DeviceItem device={device} key={device.uid} />
      ))}
    </div>
  );
}
