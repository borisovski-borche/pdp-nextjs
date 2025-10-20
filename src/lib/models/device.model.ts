export const DEVICE_MODELS = {
  SIEMENS_SX1: "siemens-sx1",
  NOKIA_1600: "nokia-1600",
  NOKIA_3250: "nokia-3250",
  NOKIA_3310: "nokia-3310",
  NOKIA_E61: "nokia-e61",
} as const;

export interface Device {
  uid: string; //a unique uuid for the device
  type: (typeof DEVICE_MODELS)[keyof typeof DEVICE_MODELS]; //type of the device
  name: string; //custom user name of the device
  contractType: "monthly" | "annual";
  status: "active" | "suspended";
  messages: {
    used: number; //currently used sms msgs
    total: number; //total sms message allowed
  };
  minutes: {
    userd: number; //currently used call minutes
    total: number; //total minutes allowed
  };
}
