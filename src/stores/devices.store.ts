import { Device } from "@/lib/models/device.model";
import { create } from "zustand";

interface DevicesState {
  devices: Device[];
  selectedDevice: Device | null;

  setDevices(devices: Device[]): void;
  setSelectedDevice(device: Device): void;
  updateDevice(id: string, updates: Partial<Device>): void;
  updateMessages(id: string, smsBundle: number): void;
  updateMinutes(id: string, smsBundle: number): void;
}

export const useDevicesStore = create<DevicesState>((set, get) => ({
  devices: [],
  selectedDevice: null,

  setSelectedDevice: (device: Device) => {
    set({ selectedDevice: device });
  },

  setDevices: (devices: Device[]) => {
    set({ devices });
  },
  updateDevice: (id: string, updates: Partial<Device>) => {
    const state = get();

    const updatedDevices = state.devices.map(device => {
      if (device.id === id) {
        return { ...device, ...updates };
      }
      return device;
    });

    set({ devices: updatedDevices });
  },
  updateMessages: (id: string, smsBundle: number) => {
    const state = get();

    const updatedDevices = state.devices.map(device => {
      if (device.id === id) {
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
  updateMinutes: (id: string, smsBundle: number) => {
    const state = get();

    const updatedDevices = state.devices.map(device => {
      if (device.id === id) {
        return {
          ...device,
          minutes: {
            ...device.minutes,
            total: device.minutes.total + smsBundle,
          },
        };
      }
      return device;
    });

    set({ devices: updatedDevices });
  },
}));
