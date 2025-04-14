"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const countries = [
  { value: "india", label: "India" },
  { value: "uae", label: "UAE" },
]

const cities = {
  india: [
    { value: "mumbai", label: "Mumbai" },
    { value: "thane", label: "Thane" },
    { value: "pune", label: "Pune" },
    { value: "nashik", label: "Nashik" },
    { value: "nagpur", label: "Nagpur" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
  ],
  uae: [
    { value: "dubai", label: "Dubai" },
    { value: "abudhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
  ],
}

export function LocationSelector() {
  const [openCountry, setOpenCountry] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover open={openCountry} onOpenChange={setOpenCountry}>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-between w-full sm:w-40 p-2 text-sm border rounded-md">
            {selectedCountry ? countries.find((country) => country.value === selectedCountry)?.label : "Select Country"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-40 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.value}
                    value={country.value}
                    onSelect={(value) => {
                      setSelectedCountry(value === selectedCountry ? null : value)
                      setSelectedCity(null)
                      setOpenCountry(false)
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${selectedCountry === country.value ? "opacity-100" : "opacity-0"}`}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openCity} onOpenChange={setOpenCity}>
        <PopoverTrigger asChild>
          <button
            className="flex items-center justify-between w-full sm:w-40 p-2 text-sm border rounded-md"
            disabled={!selectedCountry}
          >
            {selectedCity
              ? cities[selectedCountry as keyof typeof cities].find((city) => city.value === selectedCity)?.label
              : "Select City"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-40 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No city found.</CommandEmpty>
              <CommandGroup>
                {selectedCountry &&
                  cities[selectedCountry as keyof typeof cities].map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={(value) => {
                        setSelectedCity(value === selectedCity ? null : value)
                        setOpenCity(false)
                      }}
                    >
                      <Check className={`mr-2 h-4 w-4 ${selectedCity === city.value ? "opacity-100" : "opacity-0"}`} />
                      {city.label}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

