import { Suspense } from "react";
import Hero from "./components/Hero";
import Loading from "./components/loading";

export default function Home() {
  return (
    <div className=" h-screen">
      <Suspense fallback={<Loading />}>
        <main>
          <Hero />
        </main>
      </Suspense>
    </div>
  );
}
