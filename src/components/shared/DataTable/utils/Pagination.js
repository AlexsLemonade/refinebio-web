import { useState, useEffect } from 'react'
import { makePagination } from 'helpers/makePagination'
import { Box, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { InlineMessage } from 'components/shared/InlineMessage'
import { TextInput } from 'components/shared/TextInput'
import styled, { css } from 'styled-components'

const PaginationButton = styled(Button)`
  ${({ theme, current }) => css`
    &:not([disabled]),
    &:not([disabled]) span {
      background: ${current
        ? theme.global.colors.brand
        : theme.global.colors.white};
      color: ${current ? theme.global.colors.white : theme.global.colors.black};

      &:hover,
      &:hover span {
        color: ${current
          ? theme.global.colors.white
          : theme.global.colors.brand};
      }
    }
  `}
`

export const Pagination = ({ page, pageSize, totalPages, setPage }) => {
  const pageCount = Math.ceil(totalPages / pageSize) // match the react-table usePagination API's property name
  const pageNumbers = makePagination(page, pageCount)
  const [currentPage, setCurrentPage] = useState(page)
  const [userInput, setUserInput] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [canPreviousPage, setCanPreviousPage] = useState(false)
  const [canNextPage, setCanNextPage] = useState(true)

  // These names of methods match the react-table usePagination API's method names
  const nextPage = () => setCurrentPage(currentPage + 1)
  const previousPage = () => setCurrentPage(currentPage - 1)
  const gotoPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    setUserInput('')
  }

  const handleChange = (value) => {
    if (
      (Number(value) === 0 && value.trim() !== '') ||
      Number(value) > pageCount
    ) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
    setUserInput(value)
  }
  const handleOnKeyPress = (e) => {
    if (e.key === '.' || e.key === '-' || e.key === '+') {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (totalPages === currentPage) {
      setCanNextPage(false)
    } else {
      setCanNextPage(true)
    }
    if (currentPage === 1) {
      setCanPreviousPage(false)
    } else {
      setCanPreviousPage(true)
    }
  }, [totalPages, currentPage])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {totalPages > 1 ? (
        <Box
          align="center"
          direction="row"
          justify="center"
          margin={{ top: 'large' }}
        >
          <Box align="center" direction="row" margin={{ right: 'small' }}>
            <PaginationButton
              disabled={!canPreviousPage}
              gap="2px"
              label="Previous"
              icon={<Icon name="ChevronLeft" size="xsmall" />}
              style={{ padding: '2px 4px' }}
              clickHandler={previousPage}
            />
            {pageNumbers.map((pageNumber, i) =>
              pageNumber === '...' ? (
                // eslint-disable-next-line react/no-array-index-key
                <Text key={`${pageNumber}-${i}`}>{pageNumber}</Text>
              ) : (
                <PaginationButton
                  current={pageNumber === currentPage}
                  label={pageNumber}
                  key={pageNumber}
                  style={{ padding: '2px 4px' }}
                  clickHandler={() => gotoPage(pageNumber)}
                />
              )
            )}
            <PaginationButton
              disabled={!canNextPage}
              gap="2px"
              label="Next"
              icon={<Icon name="ChevronRight" size="xsmall" />}
              reverse
              style={{ padding: '2px 4px' }}
              clickHandler={nextPage}
            />
          </Box>
          <Box align="center" direction="row" style={{ position: 'relative' }}>
            {isInvalid && (
              <Box animation={{ type: 'fadeIn', duration: 500 }}>
                <InlineMessage
                  color="error"
                  height="16px"
                  justify="center"
                  label="Please enter a valid page number"
                  iconSize="small"
                  style={{ position: 'absolute', right: 0, top: '-24px' }}
                />
              </Box>
            )}
            <Text margin={{ right: 'xsmall' }}>Jump to page</Text>
            <TextInput
              min="1"
              max={pageCount}
              type="number"
              value={userInput}
              onChange={(e) => handleChange(e.target.value)}
              onKeyPress={handleOnKeyPress}
            />
            <Button
              disabled={isInvalid}
              label="Go"
              margin={{ left: 'xsmall' }}
              secondary
              clickHandler={() => gotoPage(Number(userInput))}
            />
          </Box>
        </Box>
      ) : null}
    </>
  )
}

export default Pagination
