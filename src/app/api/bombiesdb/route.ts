import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { AchievementMap } from "../../../components/type"

const prisma = new PrismaClient()

// const AchievementMapFetch = async () => {
export async function POST(req: NextRequest) {
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
  console.log(achievementMaps)
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
  // return achievements
  return NextResponse.json(achievements)
}

// export default AchievementMapFetch
