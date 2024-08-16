"use client";

import { Tab } from "@/components/tab";

export default function Example() {
  return (
    <main className="flex flex-col justify-center items-center min-h-dvh p-6 text-neutral-600">
      <p>
        Please test it fast and slow with keyboard arrow; Its works perfectly
        with
        <span className="font-bold"> framer-motion@9.1.7</span> but with
        <span className="font-bold"> framer-motion@11.x.x</span> not.
      </p>
      <Tab.Group className="border rounded-lg lg:max-w-2xl max-w-full mt-4">
        <Tab.List>
          {[...new Array(12)].map((_, i) => (
            <Tab key={i}>Tab {i + 1}</Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {[...new Array(12)].map((_, i) => (
            <Tab.Panel
              key={i}
              className="p-12 text-2xl font-bold text-center text-neutral-400"
            >
              Panel {i + 1}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </main>
  );
}
