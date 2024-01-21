"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Accordion({
  data = [
    { name: "a", desc: "dksmlsd" },
    { name: "b", desc: "dksmlsd" }, 
    { name: "c", desc: "dksmlsd" },
    
  ],
}: {
  data: {name:string,desc:string}[];
}) {
  const [disclosuresOpen, setDisclosuresOpen] = useState(
    Array(data.length).fill(false)
  );

  const handleToggleDisclosure = (index: number) => {
    setDisclosuresOpen((prev) =>
      prev.map((_, i) => (i === index ? !prev[i] : false))
    );
  };

  return (
    <div className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2 space-y-4 ">
        {
            data.map((item:any,index:number)=>(
                <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      onClick={() => handleToggleDisclosure(index)}
                      className=" flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
                    >
                      <span>{item.name}</span>
                      <ChevronUpIcon
                        className={`${
                          disclosuresOpen[index] ? "rotate-180 transform" : ""
                        } h-5 w-5 text-purple-500`}
                      />
                    </Disclosure.Button>
                    <Transition
                      show={disclosuresOpen[index]}
                      enter="transition duration-100 ease-out"
        enterFrom="transform  opacity-0"
        enterTo="transform  opacity-100  "
        leave="transition duration-75 ease-out"
        leaveFrom="transform  opacity-100"
        leaveTo="transform  opacity-0"
                    >
                      <Disclosure.Panel
                        static
                        className="px-4 pb-2 pt-4 text-sm text-gray-500"
                      >
                       {item.desc}
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))
        }
   

        {/* <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => handleToggleDisclosure(1)}
                className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
              >
                <span>Do you offer technical support?</span>
                <ChevronUpIcon
                  className={`${
                    disclosuresOpen[1] ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                show={disclosuresOpen[1]}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-screen"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100 max-h-screen"
                leaveTo="opacity-0 max-h-0"
              >
                <Disclosure.Panel
                  static
                  className="px-4 pb-2 pt-4 text-sm text-gray-500"
                >
                  No.
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure> */}
      </div>
    </div>
  );
}
