import { Suspense } from "react";
import Hero from "./components/Hero";
import Loading from "./components/loading";
import CategoryCard from "./components/CategoryCard";
import { FaTiktok, FaInstagram, FaFacebookF } from "react-icons/fa";
import PolicySection from "./components/PolicySection";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiSealCheckBold } from "react-icons/pi";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { TfiWallet } from "react-icons/tfi";

export default function Home() {
  return (
    <div className=" h-screen">
      <Suspense fallback={<Loading />}>
        <main className=" mb-20">
          <Hero />

          {/* categories */}
          <h2 className="text-black text-2xl mt-5  text-center font-bold">
            Browse Category
          </h2>
          <div className="grid md:grid-rows-2 justify-center    ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5 justify-center">
              <CategoryCard
                src="/watch.jpeg"
                alt="Watch"
                className="h-50 w-full"
                btn="Browse"
                title="Wearables"
                description="Enjoy"
              />
              <CategoryCard
                src="/vr.jpeg"
                alt="VR Glasses"
                className="h-50 w-full"
                btn="Browse"
                title="VR Glasses"
                description="Enjoy"
              />
              <CategoryCard
                src="/laptop.jpeg"
                alt="Laptops"
                className="h-50 w-full md:col-span-2 col-span-2"
                btn="Browse"
                title="Laptops"
                description="Enjoy"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 justify-center">
              <CategoryCard
                src="/smartphones.jpeg"
                alt="Smartphones"
                className="h-50 w-full md:col-span-2"
                btn="Browse"
                title="Smartphones"
                description="Enjoy"
              />
              <CategoryCard
                src="/speaker.jpeg"
                alt="speaker"
                className="h-50 w-full"
                btn="Browse"
                title="Wireless Speakers"
                description="Enjoy"
              />
              <CategoryCard
                src="/headphone.jpeg"
                alt="Headphone"
                className="h-50 w-full "
                btn="Browse"
                title="Headphones/Earpiece"
                description="Enjoy"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-5 justify-center">
              <CategoryCard
                src="/lights.jpg"
                alt="Lights"
                className="h-50 w-full md:col-span-2"
                btn="Browse"
                title="Lights"
                description="Enjoy"
              />
              <CategoryCard
                src="/image2.jpeg"
                alt="Microphone"
                className="h-50 w-full md:col-span-2"
                btn="Browse"
                title="Microphones"
                description="Enjoy"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:flex  md:justify-center md:space-x-6 mt-15 mb-10">
            {/* <policies /> */}
            <PolicySection
              icon={<LiaShippingFastSolid />}
              title="Free Shipping"
              description="Free shipping on all order"
            />
            <PolicySection
              icon={<PiSealCheckBold />}
              title="Money Guarantee"
              description="Free shipping on all order"
            />
            <PolicySection
              icon={<FaHeadphonesSimple />}
              title="Online Support 24/7"
              description="Free shipping on all order"
            />
            <PolicySection
              icon={<TfiWallet />}
              title="Secure Payment"
              description="Free shipping on all order"
            />
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
