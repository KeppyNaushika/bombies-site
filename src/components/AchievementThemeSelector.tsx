"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const AchievementThemeSelector = () => {
  const [isClick, setIsClick] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const toggleShow = () => {
    setIsClick(!isClick)
    setIsHover(!isClick)
  }

  const searchParams = useSearchParams()
  const theme = searchParams.get("theme")

  return (
    <div
      className={
        "fixed right-4 top-20 w-36 cursor-pointer justify-center rounded-md border-2 border-black transition-all duration-300 " +
        (isClick || isHover
          ? "bg-indigo-950/80 text-white"
          : "bg-white/20 text-white/40")
      }
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="relative flex h-12 w-full items-center justify-center"
        onClick={toggleShow}
        onMouseEnter={() => setIsHover(true)}
      >
        {isClick || isHover ? "▼" : theme ?? "▼"}
      </div>
      {isClick || isHover ? (
        <>
          <Link href={"/achievements?theme=Dead End"}>
            <div className="relative flex h-12 w-full items-center justify-center border-t-2">
              Dead End
            </div>
          </Link>
          <Link href={"/achievements?theme=Bad Blood"}>
            <div className="relative flex h-12 w-full items-center justify-center border-t-2">
              Bad Blood
            </div>
          </Link>
          <Link href={"/achievements?theme=Alien Arcadium"}>
            <div className="relative flex h-12 w-full items-center justify-center border-t-2">
              Alien Arcadium
            </div>
          </Link>
          <Link href={"/achievements?theme=Solo"}>
            <div className="relative flex h-12 w-full items-center justify-center border-t-2">
              Solo
            </div>
          </Link>
          <Link href={"/achievements?theme=Duo"}>
            <div className="relative flex h-12 w-full items-center justify-center border-t-2">
              Duo
            </div>
          </Link>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AchievementThemeSelector
