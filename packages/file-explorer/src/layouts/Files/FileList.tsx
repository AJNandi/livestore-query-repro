import { useRow } from "@livestore/livestore/react"
import { tables } from "@repo/livestore"
import { useNavigate } from "@tanstack/react-router"
import { CSSProperties, memo } from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import * as ReactWindow from "react-window"
import { distanceToNowFromMilliseconds } from "../../lib/dates"
import { Icon } from "../IconPicker/IconPicker"

const ITEM_HEIGHT = 36

type FileOrFolderWithType = { id: string; type: string }

export const FileList: React.FC<{ files: readonly string[]; folders: readonly string[] }> = ({ files, folders }) => {
  const filesWithType = files.map((id) => ({ type: "file", id }))
  const foldersWithType = folders.map((id) => ({ type: "folder", id }))

  const withType: FileOrFolderWithType[] = [...foldersWithType, ...filesWithType]

  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ height, width }: { width: number; height: number }) => (
          <ReactWindow.FixedSizeList
            height={height}
            itemCount={withType.length}
            itemSize={ITEM_HEIGHT}
            itemData={withType}
            overscanCount={10}
            width={width}
          >
            {VirtualRow}
          </ReactWindow.FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}

const VirtualRow = ({ data, index, style }: { data: readonly FileOrFolderWithType[]; index: number; style: CSSProperties }) => {
  const { type, id } = data[index]

  if (type === "folder") return <VirtualFolderRow folderId={id} style={style} />
  if (type === "file") return <VirtualFileRow fileId={id} style={style} />
  return null
}

const VirtualFolderRow = memo(({ folderId, style }: { folderId: string; style: CSSProperties }) => {
  const navigate = useNavigate()

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: "dummy_ID" } })

  return (
    <div
      id={folder.id}
      key={folder.id}
      className="flex cursor-default items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-slate-100 h-11 shrink-0 group"
      onClick={() => navigate({ to: `/files/${folder.id}` })}
      style={style}
    >
      <div className="flex-shrink-0 ml-3">
        <Icon icon={"FolderIcon"} color={"text-slate-600"} />
      </div>
      <div className="flex-wrap flex-shrink ml-3 overflow-hidden line-clamp-1 overflow-ellipsis">{folder.name.slice(0, 3000) || ""}</div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-xs text-gray-500 sm:block whitespace-nowrap">
        {distanceToNowFromMilliseconds(folder.created)}
      </div>
    </div>
  )
}, ReactWindow.areEqual)

const VirtualFileRow = memo(({ fileId, style }: { fileId: string; style: CSSProperties }) => {
  const [file] = useRow(tables.file, fileId, { defaultValues: { workspaceId: "dummy_ID", folderId: "dummy_ID" } })
  const navigate = useNavigate()

  return (
    <div
      id={file.id}
      key={file.id}
      className="flex cursor-default items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-slate-100 h-11 shrink-0 group"
      onClick={() => {
        navigate({ to: `/file/${file.id}` })
      }}
      style={style}
    >
      <div className="flex-shrink-0 ml-3">
        <Icon icon={"TableCellsIcon"} color={"text-slate-600"} />
      </div>
      <div className="flex-wrap flex-shrink ml-3 overflow-hidden line-clamp-1 overflow-ellipsis">{file.name.slice(0, 3000) || ""}</div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-xs text-gray-500 sm:block whitespace-nowrap">
        {distanceToNowFromMilliseconds(file.created)}
      </div>
    </div>
  )
}, ReactWindow.areEqual)
