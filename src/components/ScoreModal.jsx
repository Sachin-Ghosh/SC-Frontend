"use client"

import React from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const ScoreModal = ({ isOpen, onClose, children, title }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        {title && <DialogTitle>{title}</DialogTitle>}
      </DialogHeader>
      <DialogContent className="sm:max-w-md bg-[url('/vintage.jpg')] bg-center bg-cover">
        <div
         
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ScoreModal
