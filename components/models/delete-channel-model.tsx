"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModel } from '@/hooks/use-model-store'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'

export const DeleteChannelModel = () => {
  const router = useRouter()
  const { isOpen, type, onClose, data } = useModel()
  const isModelOpen = isOpen && type === "deleteChannel"
  const { server, channel } = data
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })
      await axios.delete(url)
      onClose()
      router.push(`/servers/${server?.id}`)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Channel
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete #<span className='font-semibold text-indigo-500'>{channel?.name}</span> Channel ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-6'>
          <div className='flex items-center justify-between w-full'>
            <Button
              disabled={isLoading}
              onClick={() => {
                onClose()
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
            >
              Delete Channel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}