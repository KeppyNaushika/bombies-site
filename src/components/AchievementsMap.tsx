import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

import TopAchievements from "@/components/TopAchievements"
import AchievementThemeSelector from "@/components/AchievementThemeSelector"

const prisma = new PrismaClient()

export type AchievementMap = {
  // id: number
  roleId: string
  parentRoleId: string | null
  theme: string | null
  description: string | null
  priority: number
  // createdAt: Date
  // updatedAt: Date
  has: boolean
  roleName: string | null
  roleColor: string
}

function toHex(v: number | null) {
  return "0x" + ("0000" + v?.toString(16).toUpperCase()).substr(-4)
}

const AchievementsMap_ = async () => {
  const achievementMaps = await prisma.achievementMaps.findMany({
    select: {
      roleId: true,
      parentRoleId: true,
      theme: true,
      description: true,
      priority: true,
      // createdAt: true,
      // updatedAt: true,
    },
  })
  const RoleNames = await prisma.roleNames.findMany({
    select: {
      roleId: true,
      roleName: true,
      roleColor: true,
      // createdAt: true,
      // updatedAt: true,
    },
  })
  const achievements = achievementMaps.map((achievementMap) => {
    const achievement: AchievementMap = {
      roleId: achievementMap.roleId,
      parentRoleId: achievementMap.parentRoleId,
      theme: achievementMap.theme,
      description: achievementMap.description,
      priority: achievementMap.priority?.toNumber() ?? 0,
      has: true,
      roleName: RoleNames.filter(
        (roleName) => roleName.roleId === achievementMap.roleId
      )[0]?.roleName,
      roleColor:
        RoleNames.filter(
          (roleName) => roleName.roleId === achievementMap.roleId
        )[0]
          ?.roleColor?.toNumber()
          .toString(16) ?? "FFFFFF",
    }
    return achievement
  })
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
