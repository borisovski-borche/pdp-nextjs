export const DEVICE_MODELS = {
  SIEMENS_SX1: "siemens-sx1",
  NOKIA_1600: "nokia-1600",
  NOKIA_3250: "nokia-3250",
  NOKIA_3310: "nokia-3310",
  NOKIA_E61: "nokia-e61",
} as const;

type DeviceModels = (typeof DEVICE_MODELS)[keyof typeof DEVICE_MODELS];

export const DEVICE_MODEL_NAMES: Record<DeviceModels, string> = {
  [DEVICE_MODELS.SIEMENS_SX1]: "Siemens SX1",
  [DEVICE_MODELS.NOKIA_1600]: "Nokia 1600",
  [DEVICE_MODELS.NOKIA_3250]: "Nokia 3250",
  [DEVICE_MODELS.NOKIA_3310]: "Nokia 3310",
  [DEVICE_MODELS.NOKIA_E61]: "Nokia E61",
};

export const CONFIRM_MODAL_OPTIONS = {
  BUY_SMS: "BUY_SMS",
  BUY_MINUTES: "BUY_MINUTES",
  CANCEL: "CANCEL",
  SUSPEND: "SUSPEND",
  RESUME: "RESUME",
} as const;

export type ConfirmModalOptions =
  (typeof CONFIRM_MODAL_OPTIONS)[keyof typeof CONFIRM_MODAL_OPTIONS];
