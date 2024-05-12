"use client";

import { useEffect, useState } from "react";
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

  const totalPages = Math.ceil(totalPosts / 10);

  const getTotalNextPages = () => {
    if (pageNumber === 1) {
      return totalPages;
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

    let startPage = currentPage; // Alteração aqui
    let endPage = startPage + visiblePages - 1;

    // Se a página final for maior que o número total de páginas, ajuste as páginas
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Se a página inicial for menor que 1, ajuste as páginas
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, visiblePages); // Atualizar a página final
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
        {currentPage !== "1" && totalPosts > 30 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => router.push(`/${page}?page=${pageNumber - 1}`)}
            />
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
        {totalNextPages > 3 && totalPages > 3 && (
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
