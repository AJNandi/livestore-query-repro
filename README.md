# Livestore Query Repro

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

- `apps/web`: A vite react app

- `packages/file-explorer`: Main react component library for file explorer
- `packages/livestore`: Livestore schema and mutations

### To run the app

```
npm i
npm run web
```

App will be hosted at http://localhost:5173/

# ERROR REPRODUCTION

Launch web app

```
npm run web
```

Sign up with email and name (not a real auth implementation)

Create a new workspace

Clicking _new file_ sometimes works and sometimes throws an error:

```
Column workspaceId has no default value and is not nullable
```


Creating a _new folder_ almost always throws an error like this:

```
LiveStore Error: Attempted to compute destroyed thunk (node-78): rowQuery:query:file:sdWJWi6sss7iPgLRUT0JuIMl:results
```


The routes `/files` and `/files/$folderId` both contain temporary queries that return ids, that are then used to query the file in a `useRow` inside the FileList component.

I "solved" this error by querying and passing the entire file and folder objects down into the FileList rather than just the IDs. 
