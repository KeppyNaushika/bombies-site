"use client"

import ChildAchievements from "@/components/ChildAchievements"
import { AchievementMap } from "@/components/AchievementsMap"
import { useRouter, useSearchParams } from "next/navigation"

const TopAchievements = ({
  achievements,
}: {
  achievements: AchievementMap[]
}) => {
  const searchParams = useSearchParams()
  const theme = searchParams.get("theme")

  achievements = achievements.filter(
    (achievement) => achievement.theme === theme
  )

  return (
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
                <div className="flex items-center">
                  <div className="my-4 flex h-20 w-80 flex-col items-center justify-center rounded-md border-2 border-dashed border-indigo-400 bg-indigo-950 py-5 text-center">
                    <div
                      className="mb-1 text-center text-white"
                      style={{
                        borderBottom: `1px dashed #${achievement.roleColor} `,
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
                  <ChildAchievements
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
}

export default TopAchievements
