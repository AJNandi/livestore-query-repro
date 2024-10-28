import { useRow, useTemporaryQuery } from "@livestore/livestore/react"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { tables, useClientState, usePersonalFolderId } from "@repo/livestore"
import { Link, ReactNode, useMatchRoute } from "@tanstack/react-router"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Icon } from "../IconPicker/IconPicker"
import WorkspaceDropdown from "../WorkspacePicker/WorkspaceDropdown"
import { querySQL, sql } from "@livestore/livestore"
import { Schema } from "@effect/schema"

function NestedFolderItem({ folderId }: { folderId: string }) {
  const matchRoute = useMatchRoute()
  const match = !!matchRoute({ to: `/files/${folderId}` })

  // const [clientState] = useClientState()
  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: "dummy_id" } })

  return (
    <div>
      <Link
        to={`/files/${folder.id}`}
        className={clsx(
          match ? "font-medium bg-slate-200 text-slate-600" : "hover:bg-slate-200/50",
          "pl-6 text-gray-700 flex gap-x-2 py-1.5 text-xs leading-6 px-2 items-center group"
        )}
      >
        <Icon icon={folder.icon ?? "FolderIcon"} color={folder.color ?? ""} />
        <div className={clsx("flex-1")}>{folder.name}</div>
      </Link>
    </div>
  )
}

function SidebarItem({ folderId }: { folderId: string }) {
  const [open, setOpen] = useState(localStorage.getItem("folder-" + folderId) === "true")

  const matchRoute = useMatchRoute()
  const match = !!matchRoute({ to: `/files/${folderId}` })

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: "dummy_ID" } })

  const folderIdsInFolder = useTemporaryQuery(
    () =>
      querySQL(() => sql`SELECT id FROM file WHERE folderId = '${folderId}' ORDER BY name desc`, {
        schema: Schema.Array(Schema.Struct({ id: Schema.String }).pipe(Schema.pluck("id"))),
      }),
    [folderId]
  )

  useEffect(() => {
    localStorage.setItem("folder-" + folderId, open ? "true" : "false")
  }, [folderId, open])

  return (
    <>
      <Link
        to={`/files/${folderId}`}
        className={clsx(
          match ? "font-medium bg-slate-200 text-slate-600" : "hover:bg-slate-200/50",
          "text-gray-700 flex gap-x-1.5 py-0.5 text-xs leading-6 px-2 items-center group font-semibold"
        )}
      >
        <Button
          variant={"ghost"}
          className="p-0"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(!open)
          }}
        >
          <ChevronRightIcon className={clsx("h-4 w-4 transition-transform duration-500", open && "transform rotate-90 ")} />
        </Button>
        <div>{folder.name}</div>
      </Link>
      <div className={clsx("overflow-hidden transition-all duration-500", open ? "max-h-96" : "max-h-0")}>
        {folderIdsInFolder.map((id) => (
          <NestedFolderItem key={`folderId-${id}`} folderId={id} />
        ))}
      </div>
    </>
  )
}

function SidebarGroup({ name, children }: { name?: string; children: ReactNode }) {
  return (
    <div className="">
      <div className="text-xs font-bold pb-1 px-2 py-2">{name}</div>
      {children}
    </div>
  )
}

export default function Sidebar({ onSignOut }: { onSignOut: () => void }) {
  const [clientState] = useClientState()

  const [workspace] = useRow(tables.workspace, clientState.activeWorkspaceId!)

  const personalRootFolder = usePersonalFolderId()

  return (
    <div className="min-w-56 w-72 flex flex-col gap-2 text-lg bg-slate-50">
      <div className="mt-5">
        <WorkspaceDropdown onSignOut={onSignOut} />
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Sidebar">
        <ul role="list" className="space-y-2 divide-y">
          <SidebarGroup>
            <SidebarItem folderId={workspace.rootFolderId} />
          </SidebarGroup>
          <SidebarGroup>{personalRootFolder && <SidebarItem folderId={personalRootFolder} />}</SidebarGroup>
        </ul>
      </nav>
    </div>
  )
}
