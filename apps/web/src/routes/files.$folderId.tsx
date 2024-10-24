import { Schema } from "@effect/schema"
import { querySQL, sql } from "@livestore/livestore"
import { useTemporaryQuery } from "@livestore/livestore/react"
import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/files/$folderId")({
  component: Files,
  pendingComponent: () => <ContentSkeleton />,
})

function Files() {
  const { folderId } = Route.useParams()

  const foldersInFolder = useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM file WHERE folderId = '${folderId}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [folderId]
  )

  
  const filesInFolder = useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM folder WHERE parentFolderId = '${folderId}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [folderId]
  )

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
