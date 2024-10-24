import { PlusIcon } from "@heroicons/react/16/solid"
import { useStore } from "@livestore/livestore/react"
import { mutations, useClientState } from "@repo/livestore"

import { nanoid } from "nanoid"
import { useState } from "react"
import { Button } from "../../components/ui/button"

const NewFileButton: React.FC<{ folderId: string }> = ({ folderId }) => {
  const { store } = useStore()
  const [clientState] = useClientState()
  const [loading, setLoading] = useState(false)

  return (
    <Button
      onClick={async (e: React.MouseEvent) => {
        try {
          setLoading(true)
          e.preventDefault()

          console.log("clientState:", clientState)

          const file = {
            fileId: nanoid(),
            folderId: folderId,
            name: "Untitled",
            created: Date.now(),
            modified: Date.now(),
            userId: clientState.activeUserId!,
            workspaceId: clientState.activeWorkspaceId!,
            membershipId: nanoid(),
          }
          console.log("creating file:", file)

          store.mutate(mutations.createFileWithMembership(file))

          // Would normally navigate to the new file here

          setLoading(false)
        } catch (e) {
          setLoading(false)
          console.error("File creation failed.")
        }
      }}
      className="bg-blue-500 hover:bg-blue-600"
    >
      {loading ? (
        <div className="border-blue-300 w-4 animate-spin rounded-full border-8 border-t-white" />
      ) : (
        <>
          <PlusIcon className="mr-2 w-5" />
          New File
        </>
      )}
    </Button>
  )
}
export default NewFileButton
