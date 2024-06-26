import {
  FrameRequest,
  getFrameHtmlResponse,
  getFrameMessage,
} from "@coinbase/onchainkit/frame"
import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json()
  const { untrustedData } = body
  const searchParams = new URLSearchParams()
  const res = (
    await axios.get(
      `https://shorts-performances-resolution-tgp.trycloudflare.com
/v1/account/trades/${process.env.OWNER_ADDRESS}`
    )
  ).data
  if (res.data.trade.error) {
    searchParams.set("title", "Trade Failed! 😢")
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Place another trade.",
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/deposit`,
      })
    )
  } else if (res.data.trade.txnHash !== "") {
    searchParams.set("title", "Trade Placed Successfully! 🎉")
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "New Trade",
          },
          {
            label: "View Transaction",
            action: "link",
            target: `https://basescan.org/tx/${res.data.trade.txnHash}`,
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/deposit`,
      })
    )
  } else {
    searchParams.set("title", "Processing the trade!")
    searchParams.set("description", "Try refreshing the frame.")
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Refresh",
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/buy`,
      })
    )
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = "force-dynamic"
