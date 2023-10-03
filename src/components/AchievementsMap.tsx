import TopAchievements from "@/components/TopAchievements"
import AchievementThemeSelector from "@/components/AchievementThemeSelector"
import AchievementMapFetch from "@/components/bombiesdb"

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

const AchievementsMap_ = async () => {
  const achievements = await AchievementMapFetch()
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
