"use client"

import type React from "react"

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  onComplete?: (otp: string) => void
}

export function OtpInput({ length, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    // Take only the last character if multiple characters are pasted/entered
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current field is empty
      const newOtp = [...otp]
      newOtp[index - 1] = ""
      setOtp(newOtp)
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (isNaN(Number(pastedData))) return

    // Fill the OTP fields with pasted data
    const newOtp = [...otp]
    for (let i = 0; i < Math.min(length, pastedData.length); i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    if (nextEmptyIndex !== -1 && nextEmptyIndex < length) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg"
        />
      ))}
    </div>
  )
}

