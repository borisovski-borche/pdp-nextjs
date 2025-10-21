import Container from "@/components/common/container/container";
import DeviceList from "@/components/ui/device-list/device-list";
import { fetchAllDevices } from "@/services/devices.service";

export default async function Devices() {
  const devices = await fetchAllDevices();

  return (
    <Container title="Device List" customClasses="!max-w-[700px]">
      <div>
        <DeviceList fetchedDevices={devices} />
      </div>
    </Container>
  );
}
