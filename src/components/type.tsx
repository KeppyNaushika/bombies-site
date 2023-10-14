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
