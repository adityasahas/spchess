// components/LadderComponent.js

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

interface LadderItem {
  _id: string;
  pos: number;
  name: string;
}

const columns = [
  {
    key: "pos",
    label: "POSITION",
  },
  {
    key: "name",
    label: "NAME",
  },
];

const getValue = (item: LadderItem, key: string) => {
  return (item as any)[key];
};

export default function LadderComponent() {
  const [rows, setRows] = useState<LadderItem[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const pages = useMemo(
    () => Math.ceil(rows.length / rowsPerPage),
    [rows.length, rowsPerPage]
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  useEffect(() => {
    fetch("/api/ladder")
      .then((response) => response.json())
      .then((data) => setRows(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold text-4xl text-center mb-8">Ladder Rankings</h1>
      <div className="shadow overflow-hidden sm:rounded-lg w-full md:w-3/4 lg:w-1/2">
        <Table
          isStriped
          aria-label="Ladder Table"
          className="min-w-full divide-y divide-gray-200"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                showShadow
                color="success"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns} className="text-center">
            {(column) => (
              <TableColumn
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    {getValue(item, columnKey as string)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
