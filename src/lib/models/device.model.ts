export interface Device {
  type: string;
  name: string;
  contractType: "monthly" | "annual";
  status: "active" | "suspended";
}
