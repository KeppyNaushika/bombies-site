"use client"
import dynamic from "next/dynamic"

const LineTo = dynamic(() => import("react-lineto"), {
  ssr: false,
})

import { DataTypes } from "sequelize"

import { sequelize } from "./sequelize"
import path from "path"

const AchievementMap = sequelize.define("AchievementMap", {
  roleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "key",
  },
  parentRoleId: {
    type: DataTypes.STRING,
  },
  theme: {
    type: DataTypes.STRING,
    unique: "key",
  },
  description: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.NUMBER,
  },
})

type achievementMap = {
  roleId: string
  parentRoleId: string | null
  theme: string
  description: string
  priority: number
  has: boolean
}

const achievements: achievementMap[] = [
  {
    roleId: "Zombies 準上級者",
    parentRoleId: null,
    theme: "Solo",
    description: "Dead End",
    priority: 0,
    has: true,
  },
  {
    roleId: "通気性抜群",
    parentRoleId: "Zombies 準上級者",
    theme: "Solo",
    description: "All Doors Opened in Dead End",
    priority: 1,
    has: true,
  },
  {
    roleId: "無課金プレイヤー",
    parentRoleId: "Zombies 準上級者",
    theme: "Solo",
    description: "No LC Weapons in Dead End",
    priority: 2,
    has: true,
  },
  {
    roleId: "ウサイン・ボルト",
    parentRoleId: "Zombies 準上級者",
    theme: "Solo",
    description: "Dead End in 30mins",
    priority: 3,
    has: true,
  },
  {
    roleId: "人間戦車",
    parentRoleId: "Zombies 準上級者",
    theme: "Solo",
    description: "Dead End Hard",
    priority: 4,
    has: true,
  },
  {
    roleId: "不死不朽",
    parentRoleId: "人間戦車",
    theme: "Solo",
    description: "Dead End RIP",
    priority: 1,
    has: true,
  },
  {
    roleId: "石器時代",
    parentRoleId: "無課金プレイヤー",
    theme: "Solo",
    description: "Buy Only Some Weapons & Armors in Dead End",
    priority: 1,
    has: true,
  },
  {
    roleId: "氷炎の使者",
    parentRoleId: "無課金プレイヤー",
    theme: "Solo",
    description: "Buy Only Some Weapons & Armors in Dead End",
    priority: 1,
    has: true,
  },
  {
    roleId: "魑魅魍魎",
    parentRoleId: null,
    theme: "Solo",
    description: "Bad Blood",
    priority: 2,
    has: true,
  },
  {
    roleId: "HIKAKIN",
    parentRoleId: "魑魅魍魎",
    theme: "Solo",
    description: "No LC Weapons in Bad Blood",
    priority: 1,
    has: true,
  },
  {
    roleId: "真石器時代",
    parentRoleId: "HIKAKIN",
    theme: "Solo",
    description: "Buy Only Some Weapons & Armors in Bad Blood",
    priority: 2,
    has: true,
  },
  {
    roleId: "百鬼夜行",
    parentRoleId: "魑魅魍魎",
    theme: "Solo",
    description: "Bad Blood Hard",
    priority: 2,
    has: true,
  },
  {
    roleId: "BB RIP Solo",
    parentRoleId: "百鬼夜行",
    theme: "Solo",
    description: "Bad Blood RIP",
    priority: 1,
    has: true,
  },
  {
    roleId: "宇宙人との孤独な対話者",
    parentRoleId: null,
    theme: "Solo",
    description: "Reach R42 in Alien Arcadium",
    priority: 2,
    has: true,
  },
]

const ChildAchievementComponent = ({
  parentAchievement,
}: {
  parentAchievement: achievementMap
}) => {
  const childAchievements = achievements
    .filter(
      (childAchievement) =>
        childAchievement.parentRoleId === parentAchievement.roleId
    )
    .sort((a, b) => a.priority - b.priority)
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
                <div className="achivement flex flex-col items-center justify-center my-4 py-5 w-80 h-20 text-center bg-gray-950 rounded-md border-dashed border-2 border-indigo-500">
                  <div className="text-center text-gray-600">
                    {achievement.roleId}
                  </div>
                  <div className="text-xs text-blue-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
              <ChildAchievementComponent parentAchievement={achievement} />
            </div>
          )
        })}
        <LineTo
          from={`${parentAchievement.roleId}-first`}
          to={`${parentAchievement.roleId}-last`}
          fromAnchor="left"
          toAnchor="left"
          borderColor="white"
          borderWidth={2}
          delay={0}
        />
      </div>
    </>
  ) : (
    <></>
  )
}

const TopAchievementComponent = (
  <div className="flex flex-col justify-center">
    {achievements
      .filter((achievement) => achievement.parentRoleId === null)
      .sort((a, b) => a.priority - b.priority)
      .map((achievement) => {
        return (
          <div
            key={achievement.roleId}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center">
              <div className="achievement-container flex items-center">
                <div className="achivement flex flex-col items-center justify-center my-4 py-5 w-80 h-20 text-center bg-indigo-950 rounded-md border-dashed border-2 border-indigo-500">
                  <div className="text-center">{achievement.roleId}</div>
                  <div className="text-xs text-blue-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
              {<ChildAchievementComponent parentAchievement={achievement} />}
            </div>
          </div>
        )
      })}
  </div>
)

// AchievementMap.sync().then(() => {
//   const achievementsMap = AchievementMap.findAll()
// })

export default function Home() {
  console.log(path.join(__dirname, "../data/bombies.sqlite"))
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
          {TopAchievementComponent}
        </div>
      </div>
    </div>
  )
}
