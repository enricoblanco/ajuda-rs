"use client";

import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useEffect, useState } from "react";

interface PaginationProps {
  isLastPage?: boolean;
  currentPage: string;
  page: string;
  totalPosts: number;
}

export const PaginationComponent = ({
  currentPage,
  page,
  totalPosts,
}: PaginationProps) => {
  const router = useRouter();
  const [pages, setPages] = useState<number[]>([]);

  const pageNumber = parseInt(currentPage);

  const getTotalNextPages = () => {
    if (pageNumber === 1) {
      return Math.ceil(totalPosts / 10);
    } else {
      return Math.ceil((totalPosts - 10 * (pageNumber - 1)) / 10);
    }
  };

  const totalNextPages = getTotalNextPages();

  const calculatePaginationNumbers = (
    currentPage: number,
    totalPages: number
  ): number[] => {
    const visiblePages = 3; // Número de páginas visíveis no componente de paginação
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = currentPage - halfVisible;
    let endPage = currentPage + halfVisible;

    // Verificar limites das páginas visíveis
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, visiblePages);
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Ajustar para incluir a primeira e a última página, se necessário
    if (endPage - startPage + 1 < visiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + visiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
      }
    }

    // Criar um array com os números das páginas a serem exibidos
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  useEffect(() => {
    const totalPages = Math.ceil(totalPosts / 10); // Supondo que 10 seja o número de posts por página
    const currentPageNumber = parseInt(currentPage);
    const paginationNumbers = calculatePaginationNumbers(
      currentPageNumber,
      totalPages
    );
    setPages(paginationNumbers);
  }, [currentPage, totalPosts]);

  return (
    <Pagination>
      <PaginationContent>
        {!(currentPage === "1") && totalPosts > 30 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => router.back()} />
          </PaginationItem>
        )}
        {pages?.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              isActive={currentPage === number.toString()}
              onClick={() => {
                if (currentPage === number.toString()) {
                  return;
                }
                router.push(`/${page}?page=${number}`);
              }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalNextPages > 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => router.push(`/${page}?page=${pageNumber + 1}`)}
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};
