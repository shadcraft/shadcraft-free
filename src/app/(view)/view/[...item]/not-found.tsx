import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ServerOff } from "lucide-react";

export default function NotFound() {
  const isDevMode = process.env.NODE_ENV === "development";

  return (
    <div className="grid min-h-svh">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ServerOff />
          </EmptyMedia>
          <EmptyTitle>Not Found</EmptyTitle>
          {isDevMode ? (
            <EmptyDescription>
              The preview you are looking for does not exist. Make sure this{" "}
              <code className="code-inline">RegistryItem</code> has been added to the main{" "}
              <code className="code-inline">Registry</code> object.
            </EmptyDescription>
          ) : (
            <EmptyDescription>The preview you are looking for does not exist.</EmptyDescription>
          )}
        </EmptyHeader>
      </Empty>
    </div>
  );
}
