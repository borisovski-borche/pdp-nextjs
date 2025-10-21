"use client";

import { Device } from "@/lib/models/device.model";
import { useRouter } from "next/navigation";

type DeviceItemProps = {
  device: Device;
  showSettingsBtn?: boolean;
};

export default function DeviceItem({
  device,
  showSettingsBtn = true,
}: DeviceItemProps) {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push(`/devices/${device.id}`);
  };

  return (
    <div className="grid grid-cols-[250px_1fr]  p-6 bg-green-300 shadow-[5px_5px] shadow-green-900 rounded-xl">
      <div className="bg-white flex justify-center h-[300px] border-2 border-green-800 rounded-md">
        <img className="h-[100%]" src={`/images/${device.type}.jpg`} alt="" />
      </div>
      <div className="grid grid-rows-[max-content_1fr_max-content] border-l-green-800 pl-5">
        <div>
          <h3 className="text-xl font-bold pb-5">
            {device.name} - {device.type}
          </h3>
        </div>
        <div className="h-[40%] grid gap-3">
          <p className="border-b-1 pb-2 border-b-emerald-600 flex justify-between">
            <span>
              <i className="fa-solid fa-calendar-days"></i> Contract Type{" "}
            </span>
            <strong className="uppercase">{device.contractType}</strong>{" "}
          </p>
          <p className="border-b-1 pb-2 border-b-emerald-600 flex justify-between">
            <span>
              <i className="fa-solid fa-power-off"></i> Status{" "}
            </span>
            <strong className="uppercase">{device.status}</strong>
          </p>
          <p className="border-b-1 pb-2 border-b-emerald-600 flex justify-between">
            <span>
              <i className="fa-solid fa-comment-sms"></i> Currently used
              messages{" "}
            </span>
            <strong>
              {device.messages.used} / {device.messages.total}
            </strong>
          </p>
          <p className="border-b-1 pb-2 border-b-emerald-600 flex justify-between">
            <span>
              <i className="fa-solid fa-clock"></i> Currently used minutes{" "}
            </span>
            <strong>
              {device.minutes.used} / {device.minutes.total}
            </strong>
          </p>
        </div>
        {showSettingsBtn && (
          <div className="justify-self-end  ">
            <button
              onClick={onSettingsClick}
              className="shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
            >
              View Settings <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
