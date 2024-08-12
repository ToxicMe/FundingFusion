/* eslint-disable react-hooks/exhaustive-deps */
import PrimaryButton from "@/components/Button";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <Header />

      <main className="flex min-h-screen flex-col items-center justify-between p-2">
        <div className="bg-white h-screen">
         
          <div className="relative isolate px-6 pt-2 lg:px-8">
            <div
              className="absolute inset-x-0 -top-4 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-2"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
            </div>
            <div className="mx-auto max-w-2xl py-10 sm:py-15 lg:py-30">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1  leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Announcing our next round of competition.{" "}
                  <a href="#" className="font-semibold text-indigo-600">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  FundFusion
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Allowing semaless management of hackathons and grants for the
                  winners.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="/grantsList"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Apply for grants
                  </a>
                  <button
                    onClick={handleClick}
                    className="text-sm text-indigo-600 font-semibold hover:cursor-pointer leading-6 "
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
            {isVisible && (
              <div className="mt-4">
                <p className="text-gray-700">
                  Our grant management system provides a comprehensive solution
                  to manage and track grants efficiently. As an administrator,
                  you can oversee applications, manage grant funds, and generate
                  reports.
                </p>
                <Link href={"/admin"}>
                  <p className="text-indigo-600">Register as administrator </p>
                </Link>
              </div>
            )}

            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
