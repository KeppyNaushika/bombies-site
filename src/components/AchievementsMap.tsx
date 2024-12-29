"use client"

import TopAchievements from "@/components/TopAchievements"
import AchievementThemeSelector from "@/components/AchievementThemeSelector"
// import AchievementMapFetch from "@/components/bombiesdb"
import { useEffect, useState } from "react"
import type { AchievementMap } from "@/components/type"

export default function AchievementMap() {
  const [achievements, setAchievements] = useState<AchievementMap[]>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      const res = await fetch("https://bombies.keppy.jp/api/achievements")
      const newAchievements = (await res.json()).data
      setAchievements(newAchievements)
    }
    fetchAchievements()
    console.log(
      `${new Date().toLocaleString("ja")}: Successfully fetched to database`
    )
  }, [])
  return (
    <div className="flex px-10 py-20">
      <div className="flex flex-col justify-center">
        <AchievementThemeSelector achievements={achievements} />
        <TopAchievements achievements={achievements} />
      </div>
    </div>
  )
}
