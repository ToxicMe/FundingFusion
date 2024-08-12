import Image from "next/image";
import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MyApprovedApplications from "../MyApplications/MyApprovedApplications";
import AllMyApplications from "../MyApplications/AllMyApplications";
import MyPaymentHistory from "../Payments/MyPaymentHistory";
import Link from "next/link";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import { useAccount, useReadContract } from "wagmi";

const UserDashboard = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section");
  const { address } = useAccount();
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getGrantApplications",
    args: [],
  });

  // console.log(data);

  interface Application {
    applicant: string;
    approved: boolean;
    demoVideoLink: string;
    description: string;
    grantId: bigint;
    id: bigint;
    ipfsHash: string;
    liveLink: string;
    problemStatement: string;
    projectTitle: string;
    sourceCode: string;
    timestamp: bigint;
  }

  const myApplications = ((data as Application[]) || [])?.filter(
    (application) => {
      return application.applicant.toLowerCase() === address?.toLowerCase();
    }
  );

  const myApprovedApplications = (
    (myApplications as Application[]) || []
  )?.filter((application) => {
    return application.approved === true;
  });

  console.log(myApprovedApplications);

  console.log(myApplications);

  const handleButtonClick = (sectionName: string) => {
    setActiveSection(sectionName); // Update active section on dashboard
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  console.log(isSideBarOpen);

  return (
    <div>
      {/* <Header  />   */}
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <div>
          <nav className="bg-white border-b border-gray-200 flex items-center sm:flex z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <Bars3Icon
                    className="block h-6 w-6 md:hidden hover:cursor-pointer"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                  />

                  <a
                    href="/"
                    className="text-xl font-bold flex items-center lg:ml-2.5"
                  >
                    <span className="self-center whitespace-nowrap text-black">
                      FundFusion
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex overflow-hidden bg-white pt-10">
            {isSideBarOpen ? (
              <div>
                <aside
                  id="sidebar"
                  aria-label="Sidebar"
                  className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
                >
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <XMarkIcon
                      className="block h-6 w-6 absolute top-4 md:hidden right-4 hover:cursor-pointer "
                      onClick={toggleSidebar}
                      aria-hidden="true"
                    />
                    <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-4">
                      <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                          <li>
                            <form action="#" className="lg:hidden">
                              <label
                                htmlFor="mobile-search"
                                className="sr-only"
                              >
                                Search
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg
                                    className="w-5 h-5 text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                  </svg>
                                </div>
                                <input
                                  type="text"
                                  name="email"
                                  id="mobile-search"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                  placeholder="Search"
                                />
                              </div>
                            </form>
                          </li>
                          <li>
                            <button
                              onClick={() => handleButtonClick("section")}
                              className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                            >
                              <svg
                                className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                              </svg>
                              <span className="ml-3">Dashboard</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleButtonClick("myapproved")}
                              className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                            >
                              <svg
                                className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                              </svg>
                              <span className="ml-3 flex-1 whitespace-nowrap">
                                Approved grants
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleButtonClick("allmyapplications")
                              }
                              className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                            >
                              <svg
                                className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                              </svg>
                              <span className="ml-3 flex-1 whitespace-nowrap">
                                All my applications
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleButtonClick("mypaymenthistory")
                              }
                              className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                            >
                              <svg
                                className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="ml-3 flex-1 whitespace-nowrap">
                                Payment History
                              </span>
                            </button>
                          </li>
                          <li>
                            <Link
                              href="/grantsList"
                              className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                            >
                              <svg
                                className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              <span className="ml-3 flex-1 whitespace-nowrap">
                                Apply for Grant
                              </span>
                            </Link>
                          </li>
                        </ul>
                        <div className="space-y-2 pt-2"></div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            ) : (
              <aside
                id="sidebar"
                className="fixed hidden z-20 h-full top-0 left-0 pt-16 sm:hidden lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
                aria-label="Sidebar"
              >
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                      <ul className="space-y-2 pb-2">
                        <li>
                          <form action="#" method="GET" className="lg:hidden">
                            <label htmlFor="mobile-search" className="sr-only">
                              Search
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                  className="w-5 h-5 text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                              </div>
                              <input
                                type="text"
                                name="email"
                                id="mobile-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                placeholder="Search"
                              />
                            </div>
                          </form>
                        </li>
                        <li>
                          <button
                            onClick={() => handleButtonClick("section")}
                            className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                          >
                            <svg
                              className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                            </svg>
                            <span className="ml-3">Dashboard</span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleButtonClick("myapproved")}
                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                          >
                            <svg
                              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                            </svg>
                            <span className="ml-3 flex-1 whitespace-nowrap">
                              Approved grants
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleButtonClick("allmyapplications")
                            }
                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                          >
                            <svg
                              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                              <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                            </svg>
                            <span className="ml-3 flex-1 whitespace-nowrap">
                              All my applications
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() =>
                              handleButtonClick("mypaymenthistory")
                            }
                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                          >
                            <svg
                              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span className="ml-3 flex-1 whitespace-nowrap">
                              Payment History
                            </span>
                          </button>
                        </li>
                        <li>
                          <Link
                            href="/grantsList"
                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                          >
                            <svg
                              className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                            <span className="ml-3 flex-1 whitespace-nowrap">
                              Apply
                            </span>
                          </Link>
                        </li>
                      </ul>
                      <div className="space-y-2 pt-2"></div>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            <div
              className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
              id="sidebarBackdrop"
            ></div>
            <div
              id="main-content"
              className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
            >
              <main>
                {activeSection === "section" && (
                  <div className="pt-4 px-4">
                    <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>
                    <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              {myApprovedApplications.length} cUSD
                            </span>
                            <h3 className="text-base font-normal text-gray-500">
                              Payment received
                            </h3>
                          </div>
                          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                            <button
                              className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-green-500 transition-all hover:bg-green-500/10 active:bg-green-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              data-ripple-dark="true"
                            >
                              VIEW
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              {myApprovedApplications.length}
                            </span>
                            <h3 className="text-base font-normal text-gray-500">
                              Approved Applications
                            </h3>
                          </div>
                          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold"></div>
                        </div>
                      </div>
                      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                              {myApplications.length}
                            </span>
                            <h3 className="text-base font-normal text-gray-500">
                              Total Applications
                            </h3>
                          </div>
                          <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                      <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold leading-none text-gray-900">
                            Grants Overview
                          </h3>
                        </div>
                        <div className="flow-root">
                          <ul role="list" className="divide-y divide-gray-200">
                            {myApplications.length === 0 ? (
                              <div>
                                <li className="py-3 sm:py-4">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        No applications
                                      </p>
                                      <p className="text-sm text-gray-500 truncate">
                                        Apply for grants
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </div>
                            ) : (
                              myApplications.map(
                                (myApplication: Application) => (
                                  <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0"></div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                          {myApplication.projectTitle}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                          <a
                                            href="/cdn-cgi/l/email-protection"
                                            className="__cf_email__"
                                            data-cfemail="17727a767e7b57607e7973646372653974787a"
                                          >
                                            [
                                            {new Date(
                                              Number(myApplication.timestamp) *
                                                1000
                                            ).toLocaleString()}
                                            ]
                                          </a>
                                        </p>
                                      </div>
                                      <div className="inline-flex items-center text-base font-semibold text-gray-500">
                                        {myApplication.approved === true
                                          ? "Approved"
                                          : "Pending"}
                                      </div>
                                    </div>
                                  </li>
                                )
                              )
                            )}

                            {/* <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Neil Sims
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="17727a767e7b57607e7973646372653974787a"
                                    >
                                      [email&#160;protected]
                                    </a>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  $320
                                </div>
                              </div>
                            </li>
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Bonnie Green
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9"
                                    >
                                      [email&#160;protected]
                                    </a>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  $3467
                                </div>
                              </div>
                            </li>
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Michael Gough
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="57323a363e3b17203e3933242332257934383a"
                                    >
                                      [email&#160;protected]
                                    </a>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  $67
                                </div>
                              </div>
                            </li>
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Thomes Lean
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="284d45494144685f41464c5b5c4d5a064b4745"
                                    >
                                      [email&#160;protected]
                                    </a>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  $2367
                                </div>
                              </div>
                            </li>
                            <li className="pt-3 sm:pt-4 pb-0">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Lana Byrd
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    <a
                                      href="/cdn-cgi/l/email-protection"
                                      className="__cf_email__"
                                      data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf"
                                    >
                                      [email&#160;protected]
                                    </a>
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  $367
                                </div>
                              </div>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                      {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                      <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                        Latest Grants Applications
                      </h3>

                      <div className="block w-full overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                          <thead>
                            <tr>
                              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                Project Title
                              </th>
                              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                                User
                              </th>
                              <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            <tr className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Organic Search
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                5,649
                              </td>
                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    30%
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Referral
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                4,025
                              </td>
                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    24%
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Direct
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                3,105
                              </td>
                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    18%
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Social
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                1251
                              </td>
                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    12%
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-500">
                              <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                                Other
                              </th>
                              <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                                734
                              </td>
                              <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    9%
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr className="text-gray-500">
                              <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                                Email
                              </th>
                              <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                                456
                              </td>
                              <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xs font-medium">
                                    7%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                    </div>
                  </div>
                )}

                {activeSection === "myapproved" && <MyApprovedApplications />}
                {activeSection === "allmyapplications" && <AllMyApplications />}
                {activeSection === "mypaymenthistory" && <MyPaymentHistory />}
              </main>
            </div>
          </div>
          {/* <script
            async
            defer
            src="https://buttons.github.io/buttons.js"
          ></script>
          <script src="https://demo.themesberg.com/windster/app.bundle.js"></script> */}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
