/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as FilesIndexImport } from './routes/files.index'
import { Route as FilesFolderIdImport } from './routes/files.$folderId'
import { Route as FileFileIdImport } from './routes/file.$fileId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const FilesIndexRoute = FilesIndexImport.update({
  path: '/files/',
  getParentRoute: () => rootRoute,
} as any)

const FilesFolderIdRoute = FilesFolderIdImport.update({
  path: '/files/$folderId',
  getParentRoute: () => rootRoute,
} as any)

const FileFileIdRoute = FileFileIdImport.update({
  path: '/file/$fileId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/file/$fileId': {
      id: '/file/$fileId'
      path: '/file/$fileId'
      fullPath: '/file/$fileId'
      preLoaderRoute: typeof FileFileIdImport
      parentRoute: typeof rootRoute
    }
    '/files/$folderId': {
      id: '/files/$folderId'
      path: '/files/$folderId'
      fullPath: '/files/$folderId'
      preLoaderRoute: typeof FilesFolderIdImport
      parentRoute: typeof rootRoute
    }
    '/files/': {
      id: '/files/'
      path: '/files'
      fullPath: '/files'
      preLoaderRoute: typeof FilesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/file/$fileId': typeof FileFileIdRoute
  '/files/$folderId': typeof FilesFolderIdRoute
  '/files': typeof FilesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/file/$fileId': typeof FileFileIdRoute
  '/files/$folderId': typeof FilesFolderIdRoute
  '/files': typeof FilesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/file/$fileId': typeof FileFileIdRoute
  '/files/$folderId': typeof FilesFolderIdRoute
  '/files/': typeof FilesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/file/$fileId' | '/files/$folderId' | '/files'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/file/$fileId' | '/files/$folderId' | '/files'
  id: '__root__' | '/' | '/file/$fileId' | '/files/$folderId' | '/files/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FileFileIdRoute: typeof FileFileIdRoute
  FilesFolderIdRoute: typeof FilesFolderIdRoute
  FilesIndexRoute: typeof FilesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FileFileIdRoute: FileFileIdRoute,
  FilesFolderIdRoute: FilesFolderIdRoute,
  FilesIndexRoute: FilesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/file/$fileId",
        "/files/$folderId",
        "/files/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/file/$fileId": {
      "filePath": "file.$fileId.tsx"
    },
    "/files/$folderId": {
      "filePath": "files.$folderId.tsx"
    },
    "/files/": {
      "filePath": "files.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
