import { mockDevices } from "@/lib/mock/devices.mock";
import { Device } from "@/lib/models/device.model";

export const fetchAllDevices = (): Device[] => {
  return mockDevices;
};
