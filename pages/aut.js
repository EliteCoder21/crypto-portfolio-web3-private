import Navbar from "../components/navbar.js";
import { useAuthContext } from '../firebase/context/context';
import Login from "../components/login.js";

export default function AUT() {
  const { user } = useAuthContext();

  return (
    <div>
      { user ?
        <div>
          <Navbar active="/aut" />
          <div className="page autpage active" id="page-autpage">
            <h1
              style={{
                fontWeight: 300,
                fontSize: 40,
                color: "white",
                margin: 20,
                padding: 0,
                textAlign: "center",
              }}
            >
              AUT - OpenEXA Asset Unique Tokens
            </h1>
            <div
              style={{ width: "80%", margin: "auto" }}
              className="transactionTable"
            >
              <div
                className="space-y-4 bg-white p-8 shadow-2xl"
                style={{
                  backgroundColor: "rgba(32, 34, 50, 0.5)",
                  borderRadius: 20,
                }}
              >
                <section className="container mx-auto px-4">
                  <div className="mt-6 flex flex-col">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                                >
                                  <button className="flex items-center gap-x-3 focus:outline-none">
                                    <span>Timestamp</span>
                                    <svg
                                      className="h-3"
                                      viewBox="0 0 10 11"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0.1"
                                      />
                                      <path
                                        d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0.1"
                                      />
                                      <path
                                        d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0.3"
                                      />
                                    </svg>
                                  </button>
                                </th>
                                <th
                                  scope="col"
                                  className="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                                >
                                  Block Number
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                                >
                                  Address
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                                >
                                  Asset
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                                >
                                  Block Hash
                                </th>
                                <th scope="col" className="relative px-4 py-3.5">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              className="divide-y divide-gray-200 bg-white dark:divide-gray-700"
                              style={{ backgroundColor: "rgb(30, 34, 45)" }}
                            >
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-06-25
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x8cfebd
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x269...1abd</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x000...0000</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                      10000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0x90d...34fc</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-06-13
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x8be7da
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0xf81...a384</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x269...1abd</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-sm font-normal text-red-600 dark:bg-gray-800">
                                      10000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0x364...628e</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-05-29
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x8a98c0
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x1e2...5c46</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x269...1abd</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-sm font-normal text-red-600 dark:bg-gray-800">
                                      5000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0x260...5b6e</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-04-28
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x87ee53
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x269...1abd</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x000...0000</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                      5000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0x3b5...b33a</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-04-21
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x875436
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x000...0000</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x269...1abd</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-sm font-normal text-red-600 dark:bg-gray-800">
                                      5000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0x3a2...ff4f</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-04-21
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x87538e
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x000...0000</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x269...1abd</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-red-100/60 px-3 py-1 text-sm font-normal text-red-600 dark:bg-gray-800">
                                      10000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0xea2...0fcf</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                              <tr className="hover:bg-neutral-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white">
                                      2023-04-21
                                    </h2>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4 text-sm font-medium">
                                  <div className="inline gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-sm font-normal text-gray-500 dark:bg-gray-800">
                                    0x87522d
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>to: 0x269...1abd</button>
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      <button>from: 0x000...0000</button>
                                    </p>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div>
                                    <div className="inline gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-sm font-normal text-emerald-500 dark:bg-gray-800">
                                      10000 OZT
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      <button>0xdf4...1b1e</button>
                                    </h4>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-sm">
                                  <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="h-6 w-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </section>
              </div>
            </div>
          </div>
        </div>
        : 
        <Login />
      }
    </div>
  );
}
