"use client"
import dynamic from "next/dynamic"

const LineTo = dynamic(() => import("react-lineto"), {
  ssr: false,
})

import { AchievementMap } from "./AchievementsMap"

const Line = ({ parentAchievement }: { parentAchievement: AchievementMap }) => {
  return (
    <LineTo
      from={`${parentAchievement.roleId}-first`}
      to={`${parentAchievement.roleId}-last`}
      fromAnchor="left"
      toAnchor="left"
      borderColor="white"
      borderWidth={2}
      delay={0}
    />
  )
}

export default Line
