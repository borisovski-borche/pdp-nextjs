import Container from "@/components/common/container/container";
import DeviceDetails from "@/components/ui/device-details/device-details";
import { fetchDeviceById } from "@/services/devices.service";

export default async function DeviceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const device = await fetchDeviceById(id);

  return (
    <Container title="Device Details">
      <DeviceDetails fetchedDevice={device} />
    </Container>
  );
}
