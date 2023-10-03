import { PrismaClient } from "@prisma/client"
import { AchievementMap } from "@/components/AchievementsMap"

const prisma = new PrismaClient()

const AchievementMapFetch = async () => {
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
  return achievements
}

export default AchievementMapFetch
