import { API_URL } from "@/lib/constants/core.constants";
import { Device } from "@/lib/models/device.model";
import { useDevicesStore } from "@/stores/devices.store";
import { toast } from "sonner";

export const fetchAllDevices = async () => {
  const res = await fetch(`${API_URL}/devices`);

  const data: Device[] = await res.json();

  return data.filter(d => d.status !== "deactivated");
};

export const fetchDeviceById = async (id: string) => {
  const res = await fetch(`${API_URL}/devices/${id}`);

  const data: Device = await res.json();

  return data;
};

export const updateDevice = async (
  device: Device,
  updates: Partial<Device>,
  msg: string
) => {
  const res = await fetch(`${API_URL}/devices/${device.id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });

  const updatedDevice: Device = await res.json();

  useDevicesStore.getState().setSelectedDevice(updatedDevice);

  toast.success(msg);
};
