/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MurdermysteryiImport } from './routes/murder_mystery_i'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const MurdermysteryiRoute = MurdermysteryiImport.update({
  path: '/murder_mystery_i',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
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
    '/murder_mystery_i': {
      id: '/murder_mystery_i'
      path: '/murder_mystery_i'
      fullPath: '/murder_mystery_i'
      preLoaderRoute: typeof MurdermysteryiImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/murder_mystery_i': typeof MurdermysteryiRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/murder_mystery_i': typeof MurdermysteryiRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/murder_mystery_i': typeof MurdermysteryiRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/murder_mystery_i'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/murder_mystery_i'
  id: '__root__' | '/' | '/murder_mystery_i'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  MurdermysteryiRoute: typeof MurdermysteryiRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  MurdermysteryiRoute: MurdermysteryiRoute,
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
        "/murder_mystery_i"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/murder_mystery_i": {
      "filePath": "murder_mystery_i.tsx"
    }
  }
}
ROUTE_MANIFEST_END */