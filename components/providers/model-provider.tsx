'use client'

import { useEffect, useState } from "react"

import { CreateServerModel } from "@/components/models/create-server-modal"
import { InviteModel } from "@/components/models/invite-model"
import { EditServerModel } from "@/components/models/edit-server-model"
import { MembersModel } from "@/components/models/members-model"
import { CreateChannelModel } from "@/components/models/create-channel-modal"
import { LeaveServerModel } from "@/components/models/leave-server-model"
import { DeleteServerModel } from "../models/delete-server-model"

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
      <LeaveServerModel />
      <DeleteServerModel />
    </>
  )
}
