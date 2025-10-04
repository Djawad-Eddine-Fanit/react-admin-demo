"use client";

import type { ColumnDef, SortingState } from "@tanstack/react-table";
import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

interface PostTableProps {
  posts: Post[];
}

export function PostTable({ posts }: PostTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (!selectedPost) return;

    toast({
      title: "Post deleted",
      description: `Post "${selectedPost.title}" has been removed.`,
    });

    setOpenDialog(false);
    setSelectedPost(null);
  };

  const columns: ColumnDef<Post>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center mx-auto"
        >
          ID
          <ArrowUpDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center mx-auto"
        >
          Title
          <ArrowUpDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "body",
      header: "Body",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="truncate max-w-[180px] sm:max-w-xs cursor-pointer text-sm sm:text-base">
                {row.original.body}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-2 text-sm">
              {row.original.body}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      accessorKey: "userId",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center mx-auto"
        >
          User ID
          <ArrowUpDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1 sm:gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="p-1 sm:p-2"
            aria-label="Edit"
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="p-1 sm:p-2"
            onClick={() => handleDeleteClick(row.original)}
            aria-label="Delete"
          >
            <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: posts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-xl border py-4 sm:py-6 px-2 sm:px-4 shadow-sm overflow-hidden"
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 sm:p-3 text-center font-semibold whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-muted/20 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-2 sm:p-3 text-center align-middle"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="my-4 text-center text-sm sm:text-base">
            Are you sure you want to delete{" "}
            <strong>{selectedPost?.title}</strong>?
          </p>
          <DialogFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
