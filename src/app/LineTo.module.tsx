"use client"
import { Decimal } from "@prisma/client/runtime/library"
import LineTo from "react-lineto"
import { AchievementMap } from "./page"

const Line = ({parentAchievement}: {parentAchievement: AchievementMap}) => {
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
