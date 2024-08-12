import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ApprovedGrants from "../Grant Applications/ApprovedGrants";
import AllGrants from "../Grant Applications/AllGrants";
import PaymentHistory from "../Payments/PaymentHistory";
import { useWriteContract, useReadContract } from "wagmi";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";

const AdministratorDashboard = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("section");
  const { data, isError, isLoading } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getGrantApplications",
    args: [],
  });

  const { data: amount } = useReadContract({
    address: FundFusionAddress,
    abi: FundFusionABI,
    functionName: "getTotalAmountPaid",
    args: [],
  });

  console.log(amount);
  const paidOut = amount as bigint;
  console.log(Number(paidOut));

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

  const applications = (data as Application[]) || [];

  const approvedApplications = (data as Application[])?.filter(
    (application) => {
      return application.approved === true;
    }
  );

  // console.log(approvedApplications);

  const handleButtonClick = (sectionName: string) => {
    setActiveSection(sectionName); // Update active section on dashboard
    toggleSidebar();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  };

  // console.log(isSideBarOpen);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between ">
        <div>
          <nav className="bg-white border-b border-gray-200 flex items-center sm:flex z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <button
                    onClick={toggleSidebar}
                    aria-expanded="true"
                    aria-controls="sidebar"
                    className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                  >
                    <svg
                      id="toggleSidebarMobileHamburger"
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <svg
                      id="toggleSidebarMobileClose"
                      className="w-6 h-6 hidden"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <a
                    href="/"
                    className="text-xl font-bold flex items-center lg:ml-2.5"
                  >
                    <span className="self-center whitespace-nowrap text-black">
                      FundFusion
                    </span>
                  </a>
                  <form action="#" className="hidden lg:block lg:pl-32">
                    <label htmlFor="topbar-search" className="sr-only">
                      Search
                    </label>
                    <div className="mt-1 relative lg:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                    </div>
                  </form>
                </div>
                <div className="flex items-center">
                  <button
                    id="toggleSidebarMobileSearch"
                    type="button"
                    className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                  ></button>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex overflow-hidden bg-white pt-10">
            {isSideBarOpen ? (
              <div>
                <aside
                  id="sidebar"
                  className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform"
                  aria-label="Sidebar"
                >
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <XMarkIcon
                      className="block h-6 w-6 absolute top-4 md:hidden right-4 hover:cursor-pointer "
                      onClick={toggleSidebar}
                      aria-hidden="true"
                    />
                    <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-4 h-full">
                      <div className="flex-1 px-3 bg-white divide-y space-y-1 h-full">
                        <ul className="space-y-2 pb-2">
                          <li>
                            <form action="#" method="GET" className="lg:hidden">
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
                              onClick={() =>
                                handleButtonClick("approvedgrants")
                              }
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
                                Approved Applications
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleButtonClick("allgrants")}
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
                                All applications
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleButtonClick("paymenthistory")
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
                              href="/registerProgramme"
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
                                Register programme
                              </span>
                            </Link>
                          </li>
                        </ul>
                        <div className="space-y-2 pt-2"></div>
                      </div>
                    </div>
                  </div>
                </aside>
                <div
                  className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                  id="sidebarBackdrop"
                ></div>
              </div>
            ) : (
              <aside
                id="sidebar"
                className="fixed hidden z-20 h-full top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
                aria-label="Sidebar"
              >
                <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                  <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1 h-full">
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
                            onClick={() => handleButtonClick("approvedgrants")}
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
                              Approved Applications
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleButtonClick("allgrants")}
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
                              All applications
                            </span>
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleButtonClick("paymenthistory")}
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
                            href="/registerProgramme"
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
                              Register programme
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
              className={` ${
                isSideBarOpen
                  ? "bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                  : ""
              } `}
            >
              <div
                id="main-content"
                className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64 "
              >
                <main>
                  {activeSection === "section" && (
                    <div className="pt-6 px-4">
                      <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4"></div>
                      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                                {Number(paidOut)/10**18} cUSD
                              </span>
                              <h3 className="text-base font-normal text-gray-500">
                                Total Paid Out
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
                                {applications.length}
                              </span>
                              <h3 className="text-base font-normal text-gray-500">
                                All applications
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
                                {applications.length}
                              </span>
                              <h3 className="text-base font-normal text-gray-500">
                                Users
                              </h3>
                            </div>
                            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                              <button
                                className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-green-500 transition-all hover:bg-green-500/10 active:bg-green-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-dark="true"
                              >
                                VIEW
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold leading-none text-gray-900">
                              Latest Grant Applications
                            </h3>
                            <a
                              href="#"
                              className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                            >
                              <button
                                className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-green-500 transition-all hover:bg-green-500/10 active:bg-green-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                data-ripple-dark="true"
                              >
                                View all
                              </button>
                            </a>
                          </div>
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
                            >
                              {applications.length === 0 ? (
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
                                applications?.map(
                                  (application: Application, index: number) => (
                                    <li className="py-3 sm:py-4">
                                      <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                          <Image
                                            className="h-8 w-8 rounded-full"
                                            width={300}
                                            height={300}
                                            src=""
                                            alt="Neil image"
                                          />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <p className="text-sm font-medium text-gray-900 truncate">
                                            {application.projectTitle}
                                          </p>
                                          <p className="text-sm text-gray-500 truncate">
                                            <a
                                              href="/cdn-cgi/l/email-protection"
                                              className="__cf_email__"
                                              data-cfemail="17727a767e7b57607e7973646372653974787a"
                                            >
                                              [
                                              {new Date(
                                                Number(application.timestamp) *
                                                  1000
                                              ).toLocaleString()}
                                              ]
                                            </a>
                                          </p>
                                        </div>
                                        <Link href={`/application/${index}`}>
                                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                            view
                                          </div>
                                        </Link>
                                      </div>
                                    </li>
                                  )
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeSection === "approvedgrants" && <ApprovedGrants />}
                  {activeSection === "allgrants" && <AllGrants />}
                  {activeSection === "paymenthistory" && <PaymentHistory />}
                </main>
              </div>
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

export default AdministratorDashboard;
