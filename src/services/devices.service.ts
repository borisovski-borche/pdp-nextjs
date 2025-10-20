import { mockDevices } from "@/lib/mock/devices.mock";
import { Device } from "@/lib/models/device.model";
import { useDevicesStore } from "@/stores/devices.store";
import { toast } from "sonner";

export const fetchAllDevices = () => {
  useDevicesStore.getState().setDevices(mockDevices);
};

export const fetchDeviceById = (id: string): Device | undefined => {
  return useDevicesStore.getState().devices.find(device => device.uid === id);
};

export const buyMessageBundle = (deviceId: string, smsAmount: number) => {
  useDevicesStore.getState().updateMessages(deviceId, smsAmount);
  toast.success("Successfully added sms messages to device");
};

export const buyMinutesBundle = (deviceId: string, minutesAmount: number) => {
  useDevicesStore.getState().updateMinutes(deviceId, minutesAmount);
  toast.success("Successfully added call minutes to device");
};
