'use client'

import { CreateServerModel } from "@/components/models/create-server-modal"
import { useEffect, useState } from "react"
import { InviteModel } from "../models/invite-model"
import { EditServerModel } from "../models/edit-server-model"
import { MembersModel } from "../models/members-model"
import { CreateChannelModel } from "../models/create-channel-modal"

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <CreateServerModel />
      <InviteModel />
      <EditServerModel />
      <MembersModel />
      <CreateChannelModel />
    </>
  )
}
