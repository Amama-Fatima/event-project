"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TimeValue } from "@/lib/types";

const formatTimeValue = (timeValue: TimeValue): string => {
  console.log("Formatting time value", timeValue);
  if (!timeValue.hour || !timeValue.minute || !timeValue.period) {
    return "";
  }
  const obj = `${timeValue.hour.padStart(2, "0")}:${timeValue.minute.padStart(
    2,
    "0"
  )} ${timeValue.period}`;
  console.log("Formatted time value", obj);
  return `${timeValue.hour.padStart(2, "0")}:${timeValue.minute.padStart(
    2,
    "0"
  )} ${timeValue.period}`;
};

interface TimePickerProps {
  h?: string;
  m?: string;
  p?: string;
  // value: TimeValue;
  onChange: (value: string) => void;
}

const TimePicker = ({
  // value,
  onChange,
  h = "",
  m = "",
  p = "",
}: TimePickerProps) => {
  console.log("h, m, p are ", h, m, p);
  const [hour, setHour] = useState<string>(h);
  const [minute, setMinute] = useState<string>(m);
  const [period, setPeriod] = useState<string>(p);
  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  useEffect(() => {
    const time = {
      hour: hour,
      minute: minute,
      period: period,
    };

    const timeInString = formatTimeValue(time);
    console.log("Time in string", timeInString);
    onChange(timeInString);
  }, [hour, minute, period]);

  // Generate minutes (00-55, step of 5)
  const minutes = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  // AM/PM
  const periods = ["AM", "PM"];

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-2">
        <Label>Hour</Label>
        <Select
          value={hour || ""}
          onValueChange={(newHour) => {
            setHour(newHour);
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Minute</Label>
        <Select
          value={minute || ""}
          onValueChange={(newMinute) => {
            // onChange?.({ ...value, minute: newMinute })
            setMinute(newMinute);
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute.padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label>Period</Label>
        <Select
          value={period || ""}
          onValueChange={(newPeriod) => {
            // onChange?.({ ...value, period: newPeriod })
            setPeriod(newPeriod);
          }}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            {periods.map((period) => (
              <SelectItem key={period} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimePicker;
