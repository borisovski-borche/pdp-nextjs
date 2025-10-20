import { Device } from "@/lib/models/device.model";
import { create } from "zustand";

interface DevicesState {
  devices: Device[];

  setDevices(devices: Device[]): void;
  updateDevice(id: string, updates: Partial<Device>): void;
  updateMessages(id: string, smsBundle: number): void;
}

export const useDevicesStore = create<DevicesState>((set, get) => ({
  devices: [],
  setDevices: (devices: Device[]) => {
    set({ devices });
  },
  updateDevice: (id: string, updates: Partial<Device>) => {
    const state = get();

    const updatedDevices = state.devices.map(device => {
      if (device.uid === id) {
        return { ...device, ...updates };
      }
      return device;
    });

    set({ devices: updatedDevices });
  },
  updateMessages: (id: string, smsBundle: number) => {
    console.log("in the state update");

    const state = get();

    const updatedDevices = state.devices.map(device => {
      if (device.uid === id) {
        return {
          ...device,
          messages: {
            ...device.messages,
            total: device.messages.total + smsBundle,
          },
        };
      }
      return device;
    });

    set({ devices: updatedDevices });
  },
}));
