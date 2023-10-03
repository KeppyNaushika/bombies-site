"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { AchievementMap } from "@/components/AchievementsMap"

const AchievementThemeSelector = ({
  achievements,
}: {
  achievements: AchievementMap[]
}) => {
  const [isClick, setIsClick] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const toggleShow = () => {
    setIsClick(!isClick)
    setIsHover(!isClick)
  }

  const searchParams = useSearchParams()
  const theme = searchParams.get("theme")

  const themesSet = new Set(
    achievements.map((achievement) => achievement.theme).filter(Boolean)
  )
  const themes = [...themesSet]

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
          {themes.map((theme, index) => (
            <Link
              key={"achievementThemeSelectorLink" + index}
              href={"/achievements?theme=" + theme}
            >
              <div className="relative flex h-12 w-full items-center justify-center border-t-2">
                {theme}
              </div>
            </Link>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default AchievementThemeSelector
