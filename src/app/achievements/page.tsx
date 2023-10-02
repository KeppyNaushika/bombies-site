import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

import Line from "../../components/LineTo.module"
import AchievementThemeComponent from "../../components/AchievementThemeComponent"

const prisma = new PrismaClient()

export type AchievementMap = {
  // id: number
  roleId: string
  parentRoleId: string | null
  theme: string | null
  description: string | null
  priority: Decimal | null
  // createdAt: Date
  // updatedAt: Date
  has: boolean
  roleName: string | null
  roleColor: Decimal | null
}

const ChildAchievementComponent = ({
  parentAchievement,
  achievements,
}: {
  parentAchievement: AchievementMap
  achievements: AchievementMap[]
}) => {
  const childAchievements = achievements
    .filter(
      (childAchievement) =>
        childAchievement.parentRoleId === parentAchievement.roleId
    )
    .sort(
      (a, b) => (a.priority?.toNumber() ?? 0) - (b.priority?.toNumber() ?? 0)
    )
  return childAchievements.length ? (
    <>
      <div className="flex w-12 items-center border-t-2 border-white"></div>
      <div className="flex flex-col justify-center">
        {childAchievements.map((achievement, index) => {
          const lineToClassName =
            index === 0
              ? `${parentAchievement.roleId}-first`
              : index === childAchievements.length - 1
              ? `${parentAchievement.roleId}-last`
              : `${parentAchievement.roleId}`

          return (
            <div key={achievement.roleId} className={`flex items-center`}>
              <div className={lineToClassName}>
                <div
                  className={`flex w-12 items-center border-t-2 border-white`}
                ></div>
              </div>
              <div className="shadow-sm">
                <div className="my-4 flex h-20 w-80 flex-col items-center justify-center rounded-md border-2 border-dashed border-indigo-400 bg-indigo-950 py-5 text-center">
                  <div
                    className="mb-1 text-center text-white"
                    style={{
                      borderBottom: `1px dashed #${achievement.roleColor
                        ?.toNumber()
                        .toString(16)} `,
                    }}
                  >
                    {achievement.roleName}
                  </div>
                  <div className="text-xs text-blue-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
              <ChildAchievementComponent
                parentAchievement={achievement}
                achievements={achievements}
              />
            </div>
          )
        })}
        <Line parentAchievement={parentAchievement} />
      </div>
    </>
  ) : (
    <></>
  )
}

const TopAchievementComponent = ({
  achievements,
}: {
  achievements: AchievementMap[]
}) => (
  <div className="flex flex-col justify-center">
    {achievements
      .filter((achievement) => achievement.parentRoleId === null)
      .sort(
        (a, b) => (a.priority?.toNumber() ?? 0) - (b.priority?.toNumber() ?? 0)
      )
      .map((achievement) => {
        return (
          <div
            key={achievement.roleId}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="my-4 flex h-20 w-80 flex-col items-center justify-center rounded-md border-2 border-dashed border-indigo-400 bg-indigo-950 py-5 text-center">
                  <div
                    className="mb-1 text-center text-white"
                    style={{
                      borderBottom: `1px dashed #${achievement.roleColor
                        ?.toNumber()
                        .toString(16)} `,
                    }}
                  >
                    {achievement.roleName}
                  </div>
                  <div className="text-xs text-blue-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
              {
                <ChildAchievementComponent
                  parentAchievement={achievement}
                  achievements={achievements}
                />
              }
            </div>
          </div>
        )
      })}
  </div>
)

export default async function Home() {
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
  const achievements = achievementMaps
    .filter((achievementMap) => achievementMap.theme === "Solo")
    .map((achievementMap) => {
      const achievement: AchievementMap = Object.assign(achievementMap, {
        has: true,
        roleName: RoleNames.filter(
          (roleName) => roleName.roleId === achievementMap.roleId
        )[0]?.roleName,
        roleColor: RoleNames.filter(
          (roleName) => roleName.roleId === achievementMap.roleId
        )[0]?.roleColor,
      })
      return achievement
    })
  return (
    <div className="">
      <div className="fixed flex w-screen justify-around bg-indigo-950/50">
        <div className="flex w-1/4 flex-col justify-center px-10">
          <div className="text-2xl">Bombies</div>
          <div className="text-xs">Enjoy Hypixel Zombies</div>
        </div>
        <div className="w-1/4 cursor-pointer text-center text-gray-500 transition-all duration-300 hover:bg-slate-600 hover:text-gray-50">
          <div className="border-b-2 border-transparent py-5">Player Stats</div>
        </div>
        <div className="flex w-1/4 cursor-pointer justify-center border-b-2 text-center text-gray-50 transition-all duration-300 hover:bg-slate-600">
          <div className="py-5">Achievements Map</div>
        </div>
        <div className="w-1/4 cursor-pointer text-center text-gray-500 transition-all duration-300">
          <div className="">
            <input
              placeholder="Member Search"
              className="w-full bg-transparent py-5 text-center outline-none transition-all duration-500 focus:bg-slate-200"
            />
          </div>
        </div>
      </div>
      <AchievementThemeComponent />
      <div className="flex justify-end"></div>
      <div className="flex px-10 py-20">
        <div className="flex flex-col justify-center">
          <TopAchievementComponent achievements={achievements} />
        </div>
      </div>
    </div>
  )
}
