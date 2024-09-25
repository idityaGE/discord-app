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
import { useRouter } from 'next/navigation'

export const DeleteServerModel = () => {
  const router = useRouter()
  const { isOpen, type, onClose, data } = useModel()
  const isModelOpen = isOpen && type === "deleteServer"
  const { server } = data
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/servers/${server?.id}`)
      onClose()
      router.refresh()
      router.push('/')
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
            Delete Server
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className='font-semibold text-rose-500'>{server?.name}</span> server ?
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
              variant="destructive"
            >
              Delete Server
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}