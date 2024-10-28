import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { useFilesInFolder, useFoldersInFolder } from "@repo/livestore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/files/$folderId")({
  component: Files,
  pendingComponent: () => <ContentSkeleton />,
})

function Files() {
  const { folderId } = Route.useParams()

  const foldersInFolder = useFoldersInFolder(folderId)
  const filesInFolder = useFilesInFolder(folderId)

  return (
    <div className="h-full w-full flex grow divide-x divide-gray-200 bg-slate-50">
      <Sidebar onSignOut={() => {}} />
      <div className="h-full w-full">
        <div className="flex p-6">
          <Header folderId={folderId} />
        </div>
        <FileList files={filesInFolder} folders={foldersInFolder} />
      </div>
    </div>
  )
}
