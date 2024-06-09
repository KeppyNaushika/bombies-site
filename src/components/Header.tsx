"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
  const router = usePathname()

  const Underline = ({
    element,
    path,
  }: {
    element: JSX.Element
    path: string
  }) => {
    return router.includes(path) ? (
      <div className="min-w-full border-b-2">{element}</div>
    ) : (
      <div className="min-w-full opacity-50 transition-all duration-300 hover:bg-slate-600 hover:opacity-100">
        {element}
      </div>
    )
  }

  return (
    <div className="fixed flex w-screen justify-around bg-indigo-950/50">
      <div className="flex w-1/4 flex-col transition-all duration-300 hover:text-gray-50">
        <Link href={"/"} className="flex grow flex-col justify-center px-10 ">
          <div className="text-2xl">Bombies</div>
          <div className="text-xs">Enjoy Hypixel Zombies</div>
        </Link>
      </div>
      <div className="flex w-1/4 cursor-pointer justify-center text-center">
        <Underline
          element={
            <Link
              href={"/player"}
              className="flex grow flex-col justify-center"
            >
              <div className="mx-auto w-full py-5">Player Stats</div>
            </Link>
          }
          path={"player"}
        />
      </div>
      <div className="flex w-1/4 cursor-pointer justify-center text-center">
        <Underline
          element={
            <Link
              href={"/achievements"}
              className="flex grow flex-col justify-center"
            >
              <div className="mx-auto w-full py-5">Achievements Map</div>
            </Link>
          }
          path={"achievement"}
        />
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
  )
}

export default Header
