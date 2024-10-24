import FolderCreateDialog from "../Folders/FolderCreateDialog"
import { FolderPath } from "./FolderPath"
import NewFileButton from "./NewFileButton"

export default function Header({ folderId }: { folderId: string }) {
  return (
    <>
      <div className="flex items-center border-b border-gray-300 py-4 px-6 h-20 w-full">
        <div className="flex-1 flex items-center font-medium text-xl space-x-2">
          <FolderPath folderId={folderId} />
        </div>
        <div className="flex space-x-2">
          <NewFileButton folderId={folderId} />
          <FolderCreateDialog parentFolderId={folderId} />
        </div>
      </div>
    </>
  )
}
