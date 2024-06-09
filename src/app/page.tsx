import Header from "@/components/Header"
import Link from "next/link"

export default function Home() {
  return (
    <div className="">
      <Header />
      {/* <div className="flex justify-end"></div> */}
      <div className="flex min-h-screen w-full items-center justify-center px-10 py-8 ">
        <Link href="https://discord.gg/MytedMz27J">
          <div className="flex flex-col rounded-md border-2 border-white px-10 py-4 text-center">
            <div className="w-full pb-2 text-center text-4xl">
              Welcome to Bombies
            </div>
            <div className="w-full text-center text-2xl">
              Join Discord Server
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
