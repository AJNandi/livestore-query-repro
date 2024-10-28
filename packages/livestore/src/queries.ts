import { getLocalId, useLocalId, useQuery, useRow, useTemporaryQuery } from "@livestore/livestore/react"
import { clientStateTable, Folder, File, tables } from "./schema"
import { querySQL, rowQuery, sql } from "@livestore/livestore"
import { Schema } from "@effect/schema"

export const useClientState = () => {
  const localId = useLocalId()
  return useRow(clientStateTable, localId)
}

const activeUserId$ = rowQuery(tables.clientState, getLocalId(), {
  map: (_) => _.activeUserId,
  label: "activeWorkspaceQuery",
})

const activeWorkspaceId$ = rowQuery(tables.clientState, getLocalId(), {
  map: (_) => _.activeWorkspaceId,
  label: "activeWorkspaceId",
})

export const userWorkspaceIds$ = querySQL((get) => sql`select workspaceId from workspaceMembership where userId = '${get(activeUserId$)}'`, {
  schema: Schema.Array(Schema.Struct({ workspaceId: Schema.String }).pipe(Schema.pluck("workspaceId"))),
  label: "userWorkspaceIds",
})

export const userWorkspaceFileIds$ = querySQL((get) => sql`select fileId from fileMembership where userId = '${get(activeUserId$)}'`, {
  schema: Schema.Array(Schema.Struct({ fileId: Schema.String }).pipe(Schema.pluck("fileId"))),
  label: "userWorkspaceFileIds",
})

export const personalRootFolderId$ = querySQL(
  (get) =>
    sql`
  SELECT fm.folderId 
  FROM folderMembership fm 
  JOIN folder f ON fm.folderId = f.id 
  WHERE fm.workspaceId = '${get(activeWorkspaceId$)}' 
  AND f.rootUserId = '${get(activeUserId$)}'
  LIMIT 1`,
  {
    schema: Schema.Array(Schema.Struct({ folderId: Schema.String }).pipe(Schema.pluck("folderId"))),
    label: "userPersonalRootFolder",
  }
)

export const usePersonalFolderId = () => {
  const [clientState] = useClientState()
  const personalRootFolderId = useQuery(personalRootFolderId$)
  return personalRootFolderId[0]
}

export const userFavorites$ = querySQL(
  (get) => sql`
  SELECT * from favorite 
  WHERE userId = '${get(activeUserId$)}' 
  AND workspaceId = '${get(activeWorkspaceId$)}'`,
  {
    schema: Schema.Array(tables.favorite.schema),
    label: "userFavorites",
  }
)

export const useFoldersInFolder = (folderId: string) =>
  useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM folder WHERE parentFolderId = '${folderId}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [folderId]
  )

export const useFilesInFolder = (folderId: string) =>
  useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM file WHERE folderId = '${folderId}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [folderId]
  )
