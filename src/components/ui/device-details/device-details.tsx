"use client";

import {
  buyMinutesBundle,
  buyMessageBundle,
  fetchDeviceById,
} from "@/services/devices.service";
import DeviceItem from "../device-item/device-item";
import { useEffect, useRef, useState } from "react";
import { useDevicesStore } from "@/stores/devices.store";
import { Device } from "@/lib/models/device.model";

type DIALOG_ACTION = "BUY_SMS" | "BUY_CALL" | "CANCEL";

export default function DeviceDetails({
  fetchedDevice,
}: {
  fetchedDevice: Device;
}) {
  const [dialogActon, setDialogAction] = useState<DIALOG_ACTION | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const device = useDevicesStore(s => s.selectedDevice);
  const setSelectedDevice = useDevicesStore(s => s.setSelectedDevice);

  useEffect(() => {
    console.log(fetchedDevice);
    setSelectedDevice(fetchedDevice);
  }, []);

  const confirmModalJSX = {
    BUY_SMS: (
      <div className="text-2xl text-center">
        <h3>
          Are you sure you want to purchase <strong>100</strong> sms messages?
        </h3>
      </div>
    ),
    BUY_CALL: (
      <div className="text-2xl text-center">
        <h3>
          Are you sure you want to purchase <strong>100</strong> call minutes?
        </h3>
      </div>
    ),
    CANCEL: (
      <div className="text-2xl text-center">
        <h3>Are you sure you want to cancel your subscription?</h3>
      </div>
    ),
  };

  const onConfirmClick = () => {
    if (dialogActon === "BUY_SMS") {
      buyMessageBundle(device as Device, 100);
    }

    if (dialogActon === "BUY_CALL") {
      buyMinutesBundle(device as Device, 100);
    }

    dialogRef.current?.close();
  };

  const openDialog = (action: DIALOG_ACTION) => {
    setDialogAction(action);

    dialogRef.current?.showModal();
  };

  return (
    <div className="pb-5 grid gap-5 grid-cols-[2fr_0.5fr] ">
      {device && <DeviceItem showSettingsBtn={false} device={device} />}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => openDialog("BUY_SMS")}
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          Buy sms bundle
        </button>
        <button
          onClick={() => openDialog("BUY_CALL")}
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          Buy call bundle
        </button>
        <button
          onClick={() => openDialog("CANCEL")}
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          Cancel Subscription
        </button>
      </div>
      <dialog
        closedby="any"
        className="confirm-dialog top-[200px] mx-auto  rounded-xl "
        ref={dialogRef}
      >
        <div className="grid h-70 w-md grid-rows-[1fr_max-content] p-5">
          <div>{dialogActon !== null && confirmModalJSX[dialogActon]}</div>
          <div className="flex gap-2 justify-self-end">
            <button
              onClick={() => onConfirmClick()}
              className="shadow-[5px_5px] p-3 rounded-xl bg-green-300 cursor-pointer shadow-green-900 hover:-translate-y-0.5 transition"
            >
              {" "}
              Confirm
            </button>
            <button
              onClick={() => dialogRef.current?.close()}
              className="shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
            >
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
