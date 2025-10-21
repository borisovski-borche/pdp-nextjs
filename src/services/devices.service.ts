import { API_URL } from "@/lib/constants/core.constants";
import { Device } from "@/lib/models/device.model";
import { useDevicesStore } from "@/stores/devices.store";
import { toast } from "sonner";

export const fetchAllDevices = async () => {
  const res = await fetch(`${API_URL}/devices`);

  const data: Device[] = await res.json();

  return data;
};

export const fetchDeviceById = async (id: string) => {
  // if (useDevicesStore.getState().selectedDevice) return;

  const res = await fetch(`${API_URL}/devices/${id}`);

  const data: Device = await res.json();

  return data;
};

export const buyMessageBundle = async (device: Device, smsAmount: number) => {
  const reqBody: Partial<Device> = {
    messages: {
      used: device.messages.used,
      total: device.messages.total + smsAmount,
    },
  };

  const res = await fetch(`${API_URL}/devices/${device.id}`, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
  });

  const updatedDevice: Device = await res.json();

  useDevicesStore.getState().setSelectedDevice(updatedDevice);

  toast.success("Successfully added sms messages to device");
};

export const buyMinutesBundle = async (
  device: Device,
  minutesAmount: number
) => {
  const reqBody: Partial<Device> = {
    minutes: {
      used: device.minutes.used,
      total: device.minutes.total + minutesAmount,
    },
  };

  const res = await fetch(`${API_URL}/devices/${device.id}`, {
    method: "PATCH",
    body: JSON.stringify(reqBody),
  });

  const updatedDevice: Device = await res.json();

  useDevicesStore.getState().setSelectedDevice(updatedDevice);

  toast.success("Successfully added call minutes to device");
};
