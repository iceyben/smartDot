import { Suspense } from "react";
import Hero from "./components/Hero";
import Loading from "./components/loading";
import Cards from "./components/Cards";

export default function Home() {
  return (
    <div className=" h-screen">
      <Suspense fallback={<Loading />}>
        <main className="">
          <Hero />
          <div className="flex space-x-4 justify-center mt-5">
            <div className="mb-5 ">
              <Cards />
            </div>
            <div>
              <Cards />
            </div>
            <div>
              <Cards />
            </div>
            <div>
              <Cards />
            </div>
          </div>
        </main>
      </Suspense>
    </div>
  );
}
