"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { AnimatedProgress } from "@/components/animated-progress"

interface UpdateProgressModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentProgress: number
  taskTitle: string
  onSave: (progress: number) => void
}

export function UpdateProgressModal({
  open,
  onOpenChange,
  currentProgress,
  taskTitle,
  onSave,
}: UpdateProgressModalProps) {
  const [value, setValue] = useState(currentProgress)

  useEffect(() => {
    if (open) {
      setValue(currentProgress)
    }
  }, [open, currentProgress])

  function handleSave() {
    onSave(value)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Update Progress</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adjust progress for{" "}
            <span className="font-medium text-foreground">{taskTitle}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="text-center">
            <span className="text-5xl font-bold tabular-nums text-primary">
              {value}
            </span>
            <span className="text-2xl font-bold text-muted-foreground">%</span>
          </div>

          <Slider
            value={[value]}
            onValueChange={(v) => setValue(v[0])}
            min={0}
            max={100}
            step={5}
            className="py-2"
          />

          <AnimatedProgress value={value} size="lg" />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
