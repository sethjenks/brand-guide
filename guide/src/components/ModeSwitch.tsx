"use client";

import {
  SegmentedControl,
  SegmentedControlItem,
} from "@astryxdesign/core/SegmentedControl";
import type { GuideMode } from "@/lib/nav";

type ModeSwitchProps = {
  mode: GuideMode;
  onModeChange: (mode: GuideMode) => void;
};

export function ModeSwitch({ mode, onModeChange }: ModeSwitchProps) {
  return (
    <SegmentedControl
      value={mode}
      onChange={(value) => {
        if (value === "define" || value === "create") {
          onModeChange(value);
        }
      }}
      label="Guide mode"
      size="sm"
      layout="fill"
    >
      <SegmentedControlItem value="define" label="Define" />
      <SegmentedControlItem value="create" label="Create" />
    </SegmentedControl>
  );
}
