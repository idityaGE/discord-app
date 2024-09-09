'use client'

import { CreateServerModel } from "@/components/models/create-server-modal"
import { useEffect, useState } from "react"
import { InviteModel } from "../models/invite-model"
import { EditServerModel } from "../models/edit-server-model"

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
    </>
  )
}
