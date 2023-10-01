import { PrismaClient } from "@prisma/client"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import Line from "./LineTo.module"
import { Decimal } from "@prisma/client/runtime/library"

const LineTo = dynamic(() => import("react-lineto"), {
  ssr: false,
})

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

// const achievements: AchievementMap[] = [
//   {
//     roleId: "Zombies 準上級者",
//     parentRoleId: null,
//     theme: "Solo",
//     description: "Dead End",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "通気性抜群",
//     parentRoleId: "Zombies 準上級者",
//     theme: "Solo",
//     description: "All Doors Opened in Dead End",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "無課金プレイヤー",
//     parentRoleId: "Zombies 準上級者",
//     theme: "Solo",
//     description: "No LC Weapons in Dead End",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "ウサイン・ボルト",
//     parentRoleId: "Zombies 準上級者",
//     theme: "Solo",
//     description: "Dead End in 30mins",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "人間戦車",
//     parentRoleId: "Zombies 準上級者",
//     theme: "Solo",
//     description: "Dead End Hard",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "不死不朽",
//     parentRoleId: "人間戦車",
//     theme: "Solo",
//     description: "Dead End RIP",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "石器時代",
//     parentRoleId: "無課金プレイヤー",
//     theme: "Solo",
//     description: "Buy Only Some Weapons & Armors in Dead End",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "氷炎の使者",
//     parentRoleId: "無課金プレイヤー",
//     theme: "Solo",
//     description: "Buy Only Some Weapons & Armors in Dead End",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "魑魅魍魎",
//     parentRoleId: null,
//     theme: "Solo",
//     description: "Bad Blood",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "HIKAKIN",
//     parentRoleId: "魑魅魍魎",
//     theme: "Solo",
//     description: "No LC Weapons in Bad Blood",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "真石器時代",
//     parentRoleId: "HIKAKIN",
//     theme: "Solo",
//     description: "Buy Only Some Weapons & Armors in Bad Blood",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "百鬼夜行",
//     parentRoleId: "魑魅魍魎",
//     theme: "Solo",
//     description: "Bad Blood Hard",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "BB RIP Solo",
//     parentRoleId: "百鬼夜行",
//     theme: "Solo",
//     description: "Bad Blood RIP",
//     priority: null,
//     has: true,
//   },
//   {
//     roleId: "宇宙人との孤独な対話者",
//     parentRoleId: null,
//     theme: "Solo",
//     description: "Reach R42 in Alien Arcadium",
//     priority: null,
//     has: true,
//   },
// ]

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
      <div className="flex items-center w-12 border-t-2 border-white"></div>
      <div className="flex flex-col justify-center">
        {childAchievements.map((achievement, index) => {
          const lineToClassName =
            index === 0
              ? `${parentAchievement.roleId}-first`
              : index === childAchievements.length - 1
              ? `${parentAchievement.roleId}-last`
              : `${parentAchievement.roleId}`

          return (
            <div
              key={achievement.roleId}
              className={`flex items-center child-bar`}
            >
              <div className={lineToClassName}>
                <div
                  className={`flex items-center w-12 border-t-2 border-white`}
                ></div>
              </div>
              <div className="achievement-container shadow-sm">
                <div className="achivement flex flex-col items-center justify-center my-4 py-5 w-80 h-20 text-center bg-indigo-950 rounded-md border-2 border-indigo-400 border-dashed">
                  <div
                    className="text-center text-white mb-1"
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
              <div className="achievement-container flex items-center">
                <div className="achivement flex flex-col items-center justify-center my-4 py-5 w-80 h-20 text-center bg-indigo-950 rounded-md border-2 border-indigo-400 border-dashed">
                  <div
                    className="text-center text-white mb-1"
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
      <div className="flex justify-around w-full">
        <div className="text-center w-1/3 text-gray-500 hover:text-gray-50 hover:bg-slate-600 transition-all duration-300 cursor-pointer">
          <div className="py-5 border-b-2 border-transparent">Player Stats</div>
        </div>
        <div className="text-center w-1/3 text-gray-500 transition-all duration-300 cursor-pointer">
          <div className="">
            <input
              placeholder="Member ID"
              className="bg-transparent text-center py-5 w-full outline-none focus:bg-slate-200 transition-all duration-500"
            />
          </div>
        </div>
        <div className="flex justify-center text-center w-1/3 text-gray-50 hover:bg-slate-600 transition-all duration-300 cursor-pointer border-b-2">
          <div className="py-5">
            Achievements Map
            <select
              name="theme"
              id="0"
              title="a"
              className="text-end max-w-32 pl-5 bg-transparent outline-none"
            >
              <option value="Solo">Solo</option>
              <option value="Solo">asdgsagdasgsag</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end"></div>
      <div className="flex px-10 py-20">
        <div className="flex flex-col justify-center">
          <TopAchievementComponent achievements={achievements} />
        </div>
      </div>
    </div>
  )
}
