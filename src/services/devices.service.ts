import { mockDevices } from "@/lib/mock/devices.mock";
import { Device } from "@/lib/models/device.model";
import { useDevicesStore } from "@/stores/devices.store";

export const fetchAllDevices = () => {
  useDevicesStore.getState().setDevices(mockDevices);
};

export const fetchDeviceById = (id: string): Device | undefined => {
  return useDevicesStore.getState().devices.find(device => device.uid === id);
};

export const buyMessageBundle = (deviceId: string, smsNumber: number) => {
  console.log("updated the state");
  return useDevicesStore.getState().updateMessages(deviceId, smsNumber);
};
