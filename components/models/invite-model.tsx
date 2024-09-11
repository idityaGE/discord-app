"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModel } from '@/hooks/use-model-store'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { CheckCheck, Copy, RefreshCcw } from 'lucide-react'
import useOrigin from '@/hooks/use-origin'
import { useState } from 'react'
import axios from 'axios'

export const InviteModel = () => {
  const origin = useOrigin()
  const { isOpen, type, onClose, data, onOpen } = useModel()
  const isModelOpen = isOpen && type === "invite"
  const { server } = data
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    // Hide the copied message after 2 seconds
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onNew = async () => {
    try {
      setIsLoading(true)
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
      onOpen("invite", { server: response.data })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose} >
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite People
          </DialogTitle>
        </DialogHeader>
        <div
          className='p-6'
        >
          <Label className='uppercase font-bold text-xs text-zinc-500 dark:text-secondary/70'>
            Server Invite Link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              readOnly
              disabled={isLoading}
              className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              size='icon'
              onClick={copy}
              className='bg-zinc-300/50 text-zinc-500 dark:text-secondary/70 hover:bg-zinc-300/70'
            >
              {copied ? <CheckCheck className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant='link'
            size='sm'
            className='text-xs text-zinc-500 mt-4'
            onClick={onNew}
          >
            Generate a new link
            <RefreshCcw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}