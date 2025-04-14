"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PriceRangeSliderProps {
  min: number
  max: number
  step: number
  defaultValue?: [number, number]
  onChange?: (values: [number, number]) => void
  formatValue?: (value: number) => string
}

export function PriceRangeSlider({
  min,
  max,
  step,
  defaultValue = [min, max],
  onChange,
  formatValue = (value) => value.toLocaleString(),
}: PriceRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>(defaultValue)
  const [minInput, setMinInput] = useState(formatValue(defaultValue[0]))
  const [maxInput, setMaxInput] = useState(formatValue(defaultValue[1]))
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!isDragging) {
      setMinInput(formatValue(values[0]))
      setMaxInput(formatValue(values[1]))
    }
  }, [values, isDragging, formatValue])

  const handleSliderChange = (newValues: number[]) => {
    const typedValues = newValues as [number, number]
    setValues(typedValues)
    if (onChange) {
      onChange(typedValues)
    }
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setMinInput(value)
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    setMaxInput(value)
  }

  const handleMinInputBlur = () => {
    let newMin = Number.parseInt(minInput.replace(/[^0-9]/g, ""), 10) || min
    newMin = Math.max(min, Math.min(newMin, values[1] - step))

    const newValues: [number, number] = [newMin, values[1]]
    setValues(newValues)
    setMinInput(formatValue(newMin))

    if (onChange) {
      onChange(newValues)
    }
  }

  const handleMaxInputBlur = () => {
    let newMax = Number.parseInt(maxInput.replace(/[^0-9]/g, ""), 10) || max
    newMax = Math.min(max, Math.max(newMax, values[0] + step))

    const newValues: [number, number] = [values[0], newMax]
    setValues(newValues)
    setMaxInput(formatValue(newMax))

    if (onChange) {
      onChange(newValues)
    }
  }

  return (
    <div className="space-y-5">
      <div className="pt-5">
        <Slider
          defaultValue={values}
          min={min}
          max={max}
          step={step}
          value={values}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onPointerDown={() => setIsDragging(true)}
          className="my-4"
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-1">
          <Label htmlFor="min-price">Min Price</Label>
          <Input
            id="min-price"
            value={minInput}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            className="focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
          />
        </div>
        <div className="flex-1 space-y-1">
          <Label htmlFor="max-price">Max Price</Label>
          <Input
            id="max-price"
            value={maxInput}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            className="focus:ring-2 focus:ring-brokx-blue/20 focus:border-brokx-blue transition-all"
          />
        </div>
      </div>
    </div>
  )
}

