import fs from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { registryItemSchema, type RegistryItem } from "shadcn/schema";
import { Project, ScriptKind } from "ts-morph";

import { fixFilePaths, fixImports } from "@/lib/registry/generate";
import { RegistryItemFile } from "@/types/shadcn-patch";
import { isBlockFromCategories } from "@/utils/registry/filters";

import { Index } from "@/registry/__index__";

export function getRegistryRenderComponent(name: string) {
  return Index[name]?.component;
}

export async function getRegistryItems(filter?: (item: RegistryItem) => boolean) {
  const entries = Object.values(Index);

  const filteredEntries = filter ? entries.filter(filter) : entries;

  const items = await Promise.all(
    filteredEntries.map(async (entry) => {
      const item = await getRegistryItem(entry.name);
      return item;
    })
  ).then((results) => results.filter(Boolean));

  return items as RegistryItem[];
}

export async function getRegistryItem(name: string): Promise<RegistryItem | null> {
  const item = Index[name];
  if (!item) return null;

  // Convert all file paths to object (pre-parse), without mutating typed data.
  const candidate = {
    ...item,
    files: Array.isArray(item.files)
      ? item.files.map((file: unknown) => (typeof file === "string" ? { path: file } : file))
      : item.files,
  };

  // Fail early before doing expensive file operations.
  const parseResult = registryItemSchema.safeParse(candidate);
  if (!parseResult.success) {
    return null;
  }

  let files: typeof parseResult.data.files = [];

  for (const file of item.files) {
    const content = await getFileContent(file);
    const relativePath = path.relative(process.cwd(), file.path);

    files.push({
      ...file,
      path: relativePath,
      content,
    });
  }

  // Fix file paths.
  files = fixFilePaths(files);

  const parsed = registryItemSchema.safeParse({ ...parseResult.data, files });
  if (!parsed.success) {
    console.error(parsed.error.message);
    return null;
  }

  const registryItem = parsed.data;
  return registryItem;
}

async function getFileContent(file: RegistryItemFile) {
  const raw = await fs.readFile(file.path, "utf-8");

  const project = new Project({
    compilerOptions: {},
  });

  const tempFile = await createTempSourceFile(file.path);
  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  });

  let code = sourceFile.getFullText();

  // Fix imports.
  code = fixImports(code);
  return code;
}
async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
  return path.join(dir, filename);
}

export async function getBlocksByCategories(categories: string[]) {
  const filter = (item: RegistryItem) => isBlockFromCategories(item, categories);
  return await getRegistryItems(filter);
}

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = [];

  for (const file of files) {
    const path = file.target ?? file.path;
    const parts = path.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        if (isFile) {
          // Update existing file node with full path
          existingNode.path = path;
        } else {
          // Move to next level in the tree
          currentLevel = existingNode.children!;
        }
      } else {
        const newNode: FileTree = isFile ? { name: part, path } : { name: part, children: [] };

        currentLevel.push(newNode);

        if (!isFile) {
          currentLevel = newNode.children!;
        }
      }
    }
  }

  return root;
}
