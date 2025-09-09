import { Suspense } from "react";
import Hero from "./components/Hero";
import Loading from "./components/loading";
import CategoryCard from "./components/CategoryCard";
import { FaTiktok, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Home() {
  return (
    <div className=" h-screen">
      <Suspense fallback={<Loading />}>
        <main className=" mb-20">
          <Hero />
          <div className="grid md:grid-rows-2 justify-center mt-5   ">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 justify-center">
              <CategoryCard
                src="/watch.jpeg"
                alt="Watch"
                className="h-50 w-full"
              />
              <CategoryCard
                src="/vr.jpeg"
                alt="Watch"
                className="h-50 w-full"
              />
              <CategoryCard
                src="/laptop.jpeg"
                alt="Laptops"
                className="h-50 w-full md:col-span-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 justify-center">
              <CategoryCard
                src="/smartphones.jpeg"
                alt="Smartphones"
                className="h-50 w-full md:col-span-2"
              />
              <CategoryCard
                src="/speaker.jpeg"
                alt="speaker"
                className="h-50 w-full"
              />
              <CategoryCard
                src="/headphone.jpeg"
                alt="Headphone"
                className="h-50 w-full "
              />
            </div>
          </div>
        </main>
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
          <nav className="grid grid-flow-col gap-4">
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Products</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a>
                <FaTiktok className="text-3xl" />
              </a>
              <a>
                <FaInstagram className="text-3xl" />
              </a>
              <a>
                <FaFacebookF className="text-3xl" />
              </a>
            </div>
          </nav>
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              smartdotcomelectronics.com
            </p>
          </aside>
        </footer>
      </Suspense>
    </div>
  );
}
