import { getFrameMetadata } from "@coinbase/onchainkit/frame"
import type { Metadata } from "next"

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      target: "_blank",
      label: "Trade Now 👾 !!!",
    },
  ],
  image: {
    src: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/FRAMECOINER.png`,
  },

  postUrl: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/api/deposit`,
})

export const metadata: Metadata = {
  title: "Deposit Frame",
  openGraph: {
    title: "Deposit Frame",
    images: [
      `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/FRAMECOINER.png`,
    ],
  },
  other: {
    ...frameMetadata,
  },
}

export default function Page() {
  return (
    <>
      <h1>Advanced Frame</h1>
    </>
  )
}
