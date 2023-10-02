import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="">
      <Header />
      <div className="flex justify-end"></div>
      <div className="flex px-10 py-20">
        <div className="flex flex-col justify-center">Welcome to Bombies</div>
      </div>
    </div>
  )
}
