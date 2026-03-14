"use client";

import React from "react";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import {
  SwapOutlined,
  DisconnectOutlined,
  CloudServerOutlined,
} from "@ant-design/icons";
import { useWorker } from "@/contexts/WorkerContext";
import { useRouter } from "next/navigation";

const WorkerDropdown: React.FC = () => {
  const {
    isControlPlane,
    selectedWorker,
    workers,
    disconnectFromWorker,
  } = useWorker();
  const router = useRouter();

  if (!isControlPlane || !selectedWorker) return null;

  const menuItems: MenuProps["items"] = [
    {
      key: "current",
      label: (
        <span>
          Connected to: <strong>{selectedWorker.name}</strong>
        </span>
      ),
      disabled: true,
    },
    { type: "divider" },
    ...workers
      .filter((w) => w.worker_id !== selectedWorker.worker_id)
      .map((w) => ({
        key: w.worker_id,
        label: w.name,
        icon: <SwapOutlined />,
        onClick: () => {
          router.push(`/ui/login?worker=${w.worker_id}`);
        },
      })),
    { type: "divider" },
    {
      key: "disconnect",
      label: "Disconnect",
      icon: <DisconnectOutlined />,
      danger: true,
      onClick: () => {
        disconnectFromWorker();
        router.push("/ui/login");
      },
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
      <Button type="text" icon={<CloudServerOutlined />}>
        {selectedWorker.name}
      </Button>
    </Dropdown>
  );
};

export default WorkerDropdown;
