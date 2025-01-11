import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export const CustomModal = ({ isOpen, onClose, children, trigger }) => {
  return (
    <Dialog className="" open={isOpen} onOpenChange={(open) => {
      if (!open) onClose()
    }}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md bg-[url('/vintage.jpg')] bg-center bg-cover">
        <div 
          className="animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
