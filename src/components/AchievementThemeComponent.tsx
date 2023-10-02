"use client"
import { useState } from "react"

const AchievementThemeComponent = () => {
  const [isClick, setIsClick] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const toggleShow = () => {
    setIsClick(!isClick)
    setIsHover(!isClick)
  }
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
        Dead End
      </div>
      {isClick || isHover ? (
        <>
          <div className="relative flex h-12 w-full items-center justify-center border-t-2">
            Bad Blood
          </div>
          <div className="relative flex h-12 w-full items-center justify-center border-t-2">
            Alien Arcadium
          </div>
          <div className="relative flex h-12 w-full items-center justify-center border-t-2">
            Solo
          </div>
          <div className="relative flex h-12 w-full items-center justify-center border-t-2">
            Duo
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AchievementThemeComponent
