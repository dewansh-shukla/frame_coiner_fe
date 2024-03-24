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
  // const { isValid, message } = await getFrameMessage(body)

  let res = (
    await axios.get(
      `https://shorts-performances-resolution-tgp.trycloudflare.com
/v1/account/${process.env.OWNER_ADDRESS}`
    )
  ).data

  const searchParams = new URLSearchParams()
  //check for balance
  if (res.balance !== "Ξ 0") {
    if (untrustedData.buttonIndex === 3) {
      let amount = untrustedData.inputText || "1000000000"

      let res = (
        await axios.post(
          `https://shorts-performances-resolution-tgp.trycloudflare.com
/v1/account/trade/${process.env.OWNER_ADDRESS}?amount=${amount}&token=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913`
        )
      ).data

      console.log("res ===========", res)
      searchParams.set("title", "Trade Placed Successfully! 🎉")
      searchParams.set("description", "Please refresh to view status")
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: "Refresh",
            },
          ],
          image: {
            src: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/og?${searchParams}`,
          },

          postUrl: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/api/buy`,
        })
      )
    } else if (untrustedData.buttonIndex === 1) {
      let metaData =
        axios.get(`https://shorts-performances-resolution-tgp.trycloudflare.com/v1/metadata/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913
`)

      searchParams.set("title", "👾 FRAMECOINER")
      searchParams.set("description", ``)
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: "Refresh",
            },
            {
              action: "link",
              label: "View Account",
              target: "https://blastscan.io",
            },
            {
              label: "Buy",
            },
          ],
          image: {
            src: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/og?${searchParams}`,
          },
          input: {
            text: "Amount",
          },
          postUrl: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/api/deposit`,
        })
      )
    }
  } else {
    searchParams.set("title", "Fund Your Account!")
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: "Refresh",
          },
          {
            action: "link",
            label: "View Account",
            target: `https://basescan.org/address/${res.account}`,
          },
        ],
        image: {
          src: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/og?${searchParams}`,
        },
        postUrl: `https://d8e6-2406-7400-94-672c-984a-bd2-4f70-68dc.ngrok-free.app/api/deposit`,
      })
    )
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = "force-dynamic"
