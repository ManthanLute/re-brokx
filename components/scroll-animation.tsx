"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function ScrollAnimation() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [buildingHeight, setBuildingHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const height = Math.min(80, position / 5) // Max height of 80vh
      setScrollPosition(position)
      setBuildingHeight(height)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", animateElements)
    // Initial check
    animateElements()

    return () => {
      window.removeEventListener("scroll", animateElements)
    }
  }, [])

  return (
    <div
      className="building-animation"
      style={{
        height: `${buildingHeight}vh`,
        opacity: scrollPosition > 100 ? 0.15 : 0,
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/brokx-logo.png"
          alt="Building Animation"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom center",
          }}
        />
      </div>
    </div>
  )
}

