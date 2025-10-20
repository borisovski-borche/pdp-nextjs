import Container from "@/components/common/container/container";
import DeviceList from "@/components/ui/device-list/device-list";

export default function Devices() {
  return (
    <Container title="Device List" customClasses="!max-w-[700px]">
      <div>
        <DeviceList />
      </div>
    </Container>
  );
}
