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
    src: `${process.env.NEXT_PUBLIC_SITE_URL}/FRAMECOINER.png`,
  },

  postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/deposit`,
})

export const metadata: Metadata = {
  title: "Deposit Frame",
  openGraph: {
    title: "Deposit Frame",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/FRAMECOINER.png`],
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
