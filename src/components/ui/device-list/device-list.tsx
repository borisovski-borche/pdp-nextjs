"use client";

import { useEffect } from "react";
import DeviceItem from "../device-item/device-item";
import { Device } from "@/lib/models/device.model";
import { useDevicesStore } from "@/stores/devices.store";

export default function DeviceList({
  fetchedDevices,
}: {
  fetchedDevices: Device[];
}) {
  const devices = useDevicesStore(s => s.devices);
  const setDevices = useDevicesStore(s => s.setDevices);

  useEffect(() => {
    setDevices(fetchedDevices);
  }, []);

  return (
    <div className="grid gap-5 pb-10">
      {devices.map(device => (
        <DeviceItem device={device} key={device.id} />
      ))}
    </div>
  );
}
