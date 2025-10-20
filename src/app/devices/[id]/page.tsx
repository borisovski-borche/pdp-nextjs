import Container from "@/components/common/container/container";
import DeviceDetails from "@/components/ui/device-details/device-details";

export default async function DeviceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <Container title="Device Details">
      <DeviceDetails id={id} />
    </Container>
  );
}
