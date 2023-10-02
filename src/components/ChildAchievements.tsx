import { AchievementMap } from "./AchievementsMap"
import Line from "./LineTo.module"

const ChildAchievements = ({
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
    .sort((a, b) => a.priority - b.priority)
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
              <ChildAchievements
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

export default ChildAchievements
