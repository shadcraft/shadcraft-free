import * as React from "react";
import { RegistryItem } from "shadcn/schema";

import { DemoViewer } from "@/components/demo-viewer";
import { createFileTreeForRegistryItemFiles, getRegistryItem } from "@/lib/registry";
import { RegistryItemFile } from "@/types/shadcn-patch";
import { formatComponentName } from "@/utils/registry";

export async function DemoDisplay({
  name,
  showHeader = false,
}: {
  name: string;
  showHeader?: boolean;
}) {
  const item = await getCachedRegistryItem(name);

  if (!item?.files) return null;

  const tree = getCachedFileTree(item.files);
  const files = getCachedFiles(item.files);

  return (
    <div className="flex flex-col gap-4">
      {showHeader && <DemoDisplayHeader item={item} />}
      <DemoViewer item={item} tree={tree} files={files} />
    </div>
  );
}

function DemoDisplayHeader({ item }: { item: RegistryItem }) {
  const { name, title, description } = item;

  return (
    <header data-slot="demo-display-header">
      <a
        href={`#${name}`}
        className="group/anchor inline-flex flex-1 flex-col font-medium md:flex-auto"
      >
        <h3 className="flex items-center gap-1 text-base underline-offset-2 group-hover/anchor:underline md:text-lg">
          {title || formatComponentName(name)}
        </h3>

        {description && (
          <p className="text-muted-foreground max-w-2xl text-xs text-pretty md:text-sm">
            {description.replace(/\.$/, "")}
          </p>
        )}
      </a>
    </header>
  );
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name);
});

const getCachedFileTree = React.cache((files: Array<{ path: string; target?: string }>) => {
  if (!files) return null;
  const fileTree = createFileTreeForRegistryItemFiles(files);
  return fileTree;
});

const getCachedFiles = React.cache((files: RegistryItemFile[]) => {
  if (!files) return null;
  const filesWithContent = files.map((file) => ({
    ...file,
    content: file.content ?? "",
  }));
  return filesWithContent;
});
