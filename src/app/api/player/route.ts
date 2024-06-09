import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// const AchievementMapFetch = async () => {
export async function GET() {
  const usernames = await prisma.usernames.findMany({
    select: {
      id: true,
      userId: true,
      uuid: true,
      username: true,
      // createdAt: true,
      // updatedAt: true,
    },
  })
  // const playerData = await prisma.hypixelPlayerData.findMany({
  //   select: {
  //     id: true,
  //     uuid: true,
  //     player: true,
  //     // createdAt: true,
  //     // updatedAt: true,
  //   },
  // })
  return NextResponse.json({ data: usernames })
}
