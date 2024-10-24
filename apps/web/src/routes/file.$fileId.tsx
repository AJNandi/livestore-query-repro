import { Button, ContentSkeleton } from "@repo/file-explorer"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/file/$fileId")({
  component: FilesIndex,
  pendingComponent: () => <ContentSkeleton />,
})

function FilesIndex() {
  return (
    <div>
      This is the file editor page
      <Button
        onClick={() => {
          history.back()
        }}
      >
        Back
      </Button>
    </div>
  )
}
