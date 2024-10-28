import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { useFilesInFolder, useFoldersInFolder, usePersonalFolderId } from "@repo/livestore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/files/")({
  component: FilesIndex,
  pendingComponent: () => <ContentSkeleton />,
})

function FilesIndex() {
  const personalRootFolder = usePersonalFolderId()
  const foldersInFolder = useFoldersInFolder(personalRootFolder)
  const filesInFolder = useFilesInFolder(personalRootFolder)

  return (
    <div className="h-full w-full flex grow divide-x divide-gray-200 bg-slate-50">
      <Sidebar onSignOut={() => {}} />
      <div className="h-full w-full">
        <div className="flex p-6">
          <Header folderId={personalRootFolder} />
        </div>
        <FileList files={filesInFolder} folders={foldersInFolder} />
      </div>
    </div>
  )
}
