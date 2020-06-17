import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

export const Pagination = ({
  items,
  maxButtons,
  boundaryLinks,
  activePage,
  onSelect,
  ...props
}) => {
  function onChange(event) {
    let text = event.target.text;
    let pageNumber = null;
    try {
      pageNumber = parseInt(text)
    } catch (e){ }
    
    if (pageNumber == null || isNaN(pageNumber)){
      return
    }
    
    if (pageNumber !== activePage) {
      onSelect(pageNumber);
    }
  }

  let half = maxButtons / 2;
  var min = activePage - half;
  if (min < 1) {
    min = 1;
  }
  var max = activePage + half;
  if (max > items) {
    max = items;
  }

  if (activePage - min < half) {
    max = max + (half - (activePage - min));
  }

  if (max - activePage < half) {
    min = min - (half - (max - activePage)) + 1;
  }

  if (min < 1) {
    min = 1;
  }
  if (max > items) {
    max = items;
  }

  let pageNumbers = [];
  pageNumbers.push(
    <BSPagination.Item active={1 === activePage}>1</BSPagination.Item>
  );
  if (min > 2) {
    pageNumbers.push(<BSPagination.Ellipsis className="disabled"/>);
  }
  for (var i = min; i < max; ++i) {
    if (i === 1 || i === items) {
      continue;
    }
    pageNumbers.push(
      <BSPagination.Item active={i === activePage}>{i}</BSPagination.Item>
    );
  }
  if (items - max > 0) {
    pageNumbers.push(<BSPagination.Ellipsis className="disabled"/>);
  }
  pageNumbers.push(
    <BSPagination.Item active={items === activePage}>{items}</BSPagination.Item>
  );

  return <BSPagination onClick={onChange}>{pageNumbers}</BSPagination>;
};
