import { DialogTitle } from "@repo/editor/src/components/ui/dialog"
import { Dialog, DialogContent, FileUploadInput, FileUploadList, UploadingFile, useImportModal } from "@repo/file-explorer"
import { useNavigate } from "@tanstack/react-router"

export function WebImportModal() {
  const navigate = useNavigate()

  const { open, setOpen, files, setFiles } = useImportModal()

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setFiles([])
        }
      }}
    >
      <DialogContent className="" aria-describedby={undefined}>
        <DialogTitle>Import</DialogTitle>
        <FileUploadInput
          setFiles={(newFiles: UploadingFile[]) => {
            setFiles(files.concat(newFiles))
          }}
        />
        <FileUploadList
          onOpenFile={(id: string) => {
            navigate({ to: `/file/${id}` })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
