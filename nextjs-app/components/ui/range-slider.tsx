"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";

type RangeSliderProps = React.ComponentPropsWithoutRef<typeof Slider> & {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function RangeSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  ...props
}: RangeSliderProps) {

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
      minStepsBetweenThumbs={1}
      {...props}
    />
  );
}
