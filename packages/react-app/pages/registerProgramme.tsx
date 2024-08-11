import { useRouter } from "next/navigation";
import React from "react";
import { useAccount, useWriteContract } from "wagmi";
import { FundFusionABI, FundFusionAddress } from "@/Blockchain/FundFusionAbi";
import { toast } from "sonner";

const RegisterProgramme = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { writeContractAsync, isPending } = useWriteContract();

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isConnected) {
      console.log("Please connect your wallet");
      toast("Please connect your wallet");
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const dateObject = new Date(data.deadline as string);
      const dateInMilliseconds = dateObject.getTime();

      const hash = await writeContractAsync({
        address: FundFusionAddress,
        abi: FundFusionABI,
        functionName: "addGrant",
        args: [
          data.name as string,
          data.description as string,
          BigInt(dateInMilliseconds),
          BigInt(Number(data.amount) * 10 ** 18),
        ],
      });
      if (hash) {
        console.log(hash);
        toast("Grant programme successfully created");
        router.push("/grantsList");
      }
    } catch (error) {
      toast.error("An error occured. Please try again");
      console.log(error);
    }
  }
  return (
    <div>
      <main>
        <div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-2">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="isolate bg-white px-6 py-2 sm:py-2 lg:px-8">
                <div
                  className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                  aria-hidden="true"
                >
                  <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
                </div>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Grant Programme Registration Form{" "}
                  </h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Register a grant platform.
                  </p>
                </div>
                <form
                  onSubmit={submitForm}
                  className="mx-auto mt-16 max-w-xl sm:mt-20"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Programme Name
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="name"
                          id="first-name"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block text-sm font-semibold leading-6 text-black"
                      >
                        Description
                      </label>
                      <div className="mt-2.5">
                        <textarea
                          name="description"
                          id="message"
                          rows={4}
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        ></textarea>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 sm:col-span-2">
                      <div>
                        <label
                          htmlFor="deadline"
                          className="block text-sm font-semibold leading-6 text-black"
                        >
                          Deadline
                        </label>
                        <input
                          type="date"
                          id="end-date"
                          name="deadline"
                          required
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm shadow-blue-500 ring-1 ring-inset ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                        ></input>
                      </div>
                      <div>
                        <label
                          htmlFor="amount"
                          className="block text-sm font-semibold leading-6 text-black"
                        >
                          Amount (in cUSD)
                        </label>
                        <div>
                          <input
                            type="text"
                            name="amount"
                            id="company"
                            required
                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex gap-x-4 sm:col-span-2">
                      <div className="flex h-6 items-center">
                        <button
                          type="button"
                          className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          role="switch"
                          aria-checked="false"
                          aria-labelledby="switch-1-label"
                        >
                          <span className="sr-only">Agree to policies</span>
                          <span
                            aria-hidden="true"
                            className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                          ></span>
                        </button>
                      </div>
                      <label
                        className="text-sm leading-6 text-gray-600"
                        id="switch-1-label"
                      >
                        By selecting this free palestine
                        <a href="#" className="font-semibold text-red-600">
                          privacy&nbsp;policy
                        </a>
                        .
                      </label>
                    </div> */}
                  </div>
                  <div className="mt-10">
                    <button
                      disabled={isPending}
                      type="submit"
                      className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {isPending ? "..." : "Register"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterProgramme;
