"use client";

import { updateDevice } from "@/services/devices.service";
import DeviceItem from "../device-item/device-item";
import { JSX, useEffect, useRef, useState } from "react";
import { useDevicesStore } from "@/stores/devices.store";
import { Device } from "@/lib/models/device.model";
import {
  CONFIRM_MODAL_OPTIONS,
  ConfirmModalOptions,
} from "@/lib/constants/device.constants";
import { useRouter } from "next/navigation";

export default function DeviceDetails({
  fetchedDevice,
}: {
  fetchedDevice: Device;
}) {
  const [dialogActon, setDialogAction] = useState<ConfirmModalOptions | null>(
    null
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const router = useRouter();

  const device = useDevicesStore(s => s.selectedDevice);
  const setSelectedDevice = useDevicesStore(s => s.setSelectedDevice);

  useEffect(() => {
    setSelectedDevice(fetchedDevice);
  }, []);

  const confirmModalJSX: Record<ConfirmModalOptions, JSX.Element> = {
    BUY_SMS: (
      <div className="text-2xl text-center">
        <h3>
          Are you sure you want to purchase <strong>100</strong> sms messages?
        </h3>
      </div>
    ),
    BUY_MINUTES: (
      <div className="text-2xl text-center">
        <h3>
          Are you sure you want to purchase <strong>100</strong> call minutes?
        </h3>
      </div>
    ),
    SUSPEND: (
      <div className="text-2xl text-center">
        <h3>Are you sure you want to suspend your device?</h3>
      </div>
    ),
    RESUME: (
      <div className="text-2xl text-center">
        <h3>Please confirm if you want to resume your service.</h3>
      </div>
    ),
    CANCEL: (
      <div className="text-2xl text-center">
        <h3>Are you sure you want to cancel your subscription?</h3>
      </div>
    ),
  };

  const onConfirmClick = () => {
    if (!device) return;

    if (dialogActon === CONFIRM_MODAL_OPTIONS.BUY_SMS) {
      updateDevice(
        device,
        {
          messages: {
            used: device?.messages.used,
            total: device?.messages.total + 100,
          },
        },
        "Successfully added 100 sms messages to device"
      );
    }

    if (dialogActon === CONFIRM_MODAL_OPTIONS.BUY_MINUTES) {
      updateDevice(
        device,
        {
          minutes: {
            used: device?.minutes.used,
            total: device?.minutes.total + 100,
          },
        },
        "Successfully added 100 call minutes to device"
      );
    }

    if (dialogActon === CONFIRM_MODAL_OPTIONS.SUSPEND) {
      updateDevice(
        device,
        { status: "suspended" },
        "Subscription successfully suspended"
      );
    }

    if (dialogActon === CONFIRM_MODAL_OPTIONS.RESUME) {
      updateDevice(
        device,
        { status: "active" },
        "Subscription successfully resumed"
      );
    }

    if (dialogActon === CONFIRM_MODAL_OPTIONS.CANCEL) {
      updateDevice(
        device,
        { status: "deactivated" },
        "Subscription successfully cancelled"
      );
      router.push("/devices");
    }

    dialogRef.current?.close();
  };

  const openDialog = (action: ConfirmModalOptions) => {
    setDialogAction(action);

    dialogRef.current?.showModal();
  };

  return (
    <div className="pb-5 grid gap-5 grid-cols-[2fr_0.5fr] ">
      {device && <DeviceItem showSettingsBtn={false} device={device} />}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => openDialog(CONFIRM_MODAL_OPTIONS.BUY_SMS)}
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          Buy sms bundle
        </button>
        <button
          onClick={() => openDialog(CONFIRM_MODAL_OPTIONS.BUY_MINUTES)}
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          Buy call bundle
        </button>
        <button
          onClick={() =>
            openDialog(
              device?.status === "active"
                ? CONFIRM_MODAL_OPTIONS.SUSPEND
                : CONFIRM_MODAL_OPTIONS.RESUME
            )
          }
          className="w-[100%] shadow-[5px_5px] p-3 rounded-xl bg-red-300 cursor-pointer shadow-red-900 hover:-translate-y-0.5 transition"
        >
          {device?.status === "active" ? "Suspend" : "Resume"} subscription
        </button>
        <button
          onClick={() => openDialog(CONFIRM_MODAL_OPTIONS.CANCEL)}
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
