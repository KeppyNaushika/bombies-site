"use client"

import TopAchievements from "@/components/TopAchievements"
import AchievementThemeSelector from "@/components/AchievementThemeSelector"
// import AchievementMapFetch from "@/components/bombiesdb"
import { useEffect, useState } from "react"
import { AchievementMap } from "@/components/type"

const AchievementsMap_ = async () => {
  const [achievements, setAchievements] = useState<AchievementMap[]>([])
  console.log(achievements)

  useEffect(() => {
    const fetchAchievements = async () => {
      const res = await fetch("/api/bombiesdb")
      console.log(res)
      const newAchievements = await res.json()
      console.log(newAchievements)
      setAchievements(newAchievements)
    }
    fetchAchievements()
  }, [])

  // const achievements = await AchievementMapFetch()
  return (
    <div className="flex px-10 py-20">
      <div className="flex flex-col justify-center">
        <AchievementThemeSelector achievements={achievements} />
        <TopAchievements achievements={achievements} />
      </div>
    </div>
  )
}

export default function AchievementMap() {
  return <AchievementsMap_ />
}
