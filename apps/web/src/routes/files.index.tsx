import { Schema } from "@effect/schema"
import { querySQL, sql } from "@livestore/livestore"
import { useTemporaryQuery } from "@livestore/livestore/react"
import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { usePersonalFolderId } from "@repo/livestore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/files/")({
  component: FilesIndex,
  pendingComponent: () => <ContentSkeleton />,
})

function FilesIndex() {
  const personalRootFolder = usePersonalFolderId()

  const foldersInFolder = useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM file WHERE folderId = '${personalRootFolder}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [personalRootFolder]
  )
  const filesInFolder = useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM folder WHERE parentFolderId = '${personalRootFolder}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [personalRootFolder]
  )

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
