import Container from "@/components/common/container/container";

export default async function DeviceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <Container title="Device Details">
      <h2>This is the device details</h2>
    </Container>
  );
}
