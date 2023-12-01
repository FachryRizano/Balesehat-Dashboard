import React, { useState, useEffect } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import Progress from "components/progress";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel
} from "@tanstack/react-table";



const columnHelper = createColumnHelper<any>();

// const columns = columnsDataCheck;
export default function PerformanceAdsTable(props: { title: string, tableData: any,columnOrder:string[] }) {
    const { title, tableData, columnOrder} = props;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const pageSize = 5;
    let defaultData = tableData;
    // Dynamically determine columns based on tableData keys
    // Dynamically determine or use provided columns
    const columns = (columnOrder && columnOrder.length > 0 ? columnOrder : Object.keys(tableData[0] || {}))
        .map(key => {
            return columnHelper.accessor(key, {
                id: key,
                header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">{key.toUpperCase()}</p>,
                cell: info => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
            });
        });
    const [data, setData] = React.useState(() => [...defaultData]);
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination: {
                pageIndex,
                pageSize,
            }
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 500); // Reset animation state
        return () => clearTimeout(timer);
    }, [pageIndex]); // Trigger animation on page change

    return (
        <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto mt-5"}>
            <div className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    {title}
                </div>
                {/* <CardMenu /> */}
            </div>

            <div className={`mt-8 overflow-x-scroll xl:overflow-x-hidden `}>
                <table className={`w-full`}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                                        >
                                            <div className="items-center justify-between text-xs text-gray-200">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: "",
                                                    desc: "",
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={`${animate ? 'animate-fadeIn' : ''}`}>
                        {table
                            .getRowModel()
                            .rows.slice(0, 5)
                            .map((row) => {
                                return (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className="min-w-[150px] border-white/0 py-3  pr-4"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="flex items-center justify-center space-x-2">
                        <button
                            onClick={() => setPageIndex(0)}
                            disabled={pageIndex === 0}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                        >
                            First
                        </button>

                        <button
                            onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
                            disabled={pageIndex === 0}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                        >
                            Previous
                        </button>

                        <span className="text-sm font-medium">
                            Page {pageIndex + 1} of {table.getPageCount()}
                        </span>

                        <button
                            onClick={() => setPageIndex(old => (!table.getCanNextPage() ? old : old + 1))}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                        >
                            Next
                        </button>

                        <button
                            onClick={() => setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                        >
                            Last
                        </button>
                    </div>

                </div>

            </div>

        </Card>
    );
}
