import { Device, DEVICE_MODELS } from "../models/device.model";

export const mockDevices: Device[] = [
  {
    uid: "f1a2c3e4-1111-4444-8888-abcdef123456",
    type: DEVICE_MODELS.NOKIA_3310,
    name: "Dad's Classic Phone",
    contractType: "monthly",
    status: "active",
    messages: {
      used: 72,
      total: 300,
    },
    minutes: {
      userd: 140,
      total: 400,
    },
  },
  {
    uid: "b2b2c2d2-2222-5555-9999-bb1234567890",
    type: DEVICE_MODELS.SIEMENS_SX1,
    name: "Backup Device",
    contractType: "annual",
    status: "active",
    messages: {
      used: 188,
      total: 450,
    },
    minutes: {
      userd: 220,
      total: 480,
    },
  },
  {
    uid: "c3c3d3e3-3333-6666-aaaa-cc9876543210",
    type: DEVICE_MODELS.NOKIA_3250,
    name: "Music Phone",
    contractType: "monthly",
    status: "active",
    messages: {
      used: 45,
      total: 200,
    },
    minutes: {
      userd: 60,
      total: 250,
    },
  },
  {
    uid: "d4d4e4f4-4444-7777-bbbb-ddabcdefabcd",
    type: DEVICE_MODELS.NOKIA_E61,
    name: "Work Line",
    contractType: "annual",
    status: "active",
    messages: {
      used: 310,
      total: 500,
    },
    minutes: {
      userd: 390,
      total: 500,
    },
  },
  {
    uid: "e5e5f5g5-5555-8888-cccc-ee123abc4567",
    type: DEVICE_MODELS.NOKIA_1600,
    name: "Old Spare",
    contractType: "monthly",
    status: "suspended",
    messages: {
      used: 25,
      total: 150,
    },
    minutes: {
      userd: 35,
      total: 180,
    },
  },
];
