"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface CombinedPaginationProps {
    total: number
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
}

export function CombinedPagination({
    total,
    pageSize,
    currentPage,
    onPageChange,
}: CombinedPaginationProps) {
    // Calculate total pages
    const totalPages = Math.ceil(total / pageSize)

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is less than max to show
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Calculate start and end of middle pages
            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                endPage = 4
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pages.push("ellipsis-start")
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pages.push("ellipsis-end")
            }

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    // Render shadcn/ui pagination
    const renderShadcnPagination = () => {
        const pages = getPageNumbers();

        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) onPageChange(currentPage - 1)
                            }}
                            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {pages.map((page, index) => {
                        if (page === "ellipsis-start" || page === "ellipsis-end") {
                            return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === page}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(page as number)
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < totalPages) onPageChange(currentPage + 1)
                            }}
                            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        )
    }

    // Custom renderer for rc-pagination
    const itemRender = (current: number, type: string, element: React.ReactNode) => {
        if (type === "page") {
            return (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        onPageChange(current)
                    }}
                    className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-sm ${current === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                >
                    {current}
                </a>
            )
        }
        if (type === "prev") {
            return (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) onPageChange(currentPage - 1)
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                </a>
            )
        }
        if (type === "next") {
            return (
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < totalPages) onPageChange(currentPage + 1)
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                </a>
            )
        }
        return element
    }

    return (
        <div className="p-3 w-fit mx-auto bg-white rounded-20 shadow">
            {renderShadcnPagination()}
        </div>
    )
}

