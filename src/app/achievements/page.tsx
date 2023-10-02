import AchievementThemeSelector from "@/components/AchievementThemeSelector"
import Header from "@/components/Header"
import AchievementsMap from "@/components/AchievementsMap"

export default function Home() {
  return (
    <div className="">
      <Header />
      <AchievementThemeSelector />
      <div className="flex justify-end"></div>
      <AchievementsMap />
    </div>
  )
}
