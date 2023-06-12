import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { makePagination } from 'helpers/makePagination'
import { nanoid } from 'nanoid'
import { Box, Form, Text } from 'grommet'
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

export const Pagination = ({
  pageSize,
  setPage,
  totalPages,
  updatePage,
  page = 1
}) => {
  const { query, isReady } = useRouter()
  const { setResponsive } = useResponsive()
  const pageCount = Math.ceil(totalPages / pageSize)
  const [currentPage, setCurrentPage] = useState(page || 1)
  const pageNumbers = makePagination(currentPage, pageCount)
  const [userInput, setUserInput] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [canPreviousPage, setCanPreviousPage] = useState(false)
  const [canNextPage, setCanNextPage] = useState(true)
  const nextPage = () => setCurrentPage(currentPage + 1)
  const previousPage = () => setCurrentPage(currentPage - 1)

  useEffect(() => {
    if (!isReady) return

    setCurrentPage(query.p ? Number(query.p) : 1)
  }, [isReady, query])

  // updates the search page url with selected page number
  const updateQueryForPage = (newPage) => {
    if (updatePage) {
      updatePage(newPage)
    }
  }

  const gotoPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    setUserInput('')
    updateQueryForPage(pageNumber)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.trim() === '') return

    updateQueryForPage(Number(userInput))
    gotoPage(Number(userInput))
  }

  const handleChangeUserInput = (value) => {
    if ((value === '0' && value.trim() !== '') || Number(value) > pageCount) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
    setUserInput(value)
  }

  const handleKeyPress = (e) => {
    const code = e.key !== undefined ? e.key : e.keyCode
    if (e.key === 'Enter' || e.keyCode === 13) return

    if (!code.match(/^[0-9]+$/)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (pageCount === currentPage) {
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
    setPage(currentPage - 1)
  }, [currentPage])

  if (totalPages < 1) return null

  return (
    <Box direction={setResponsive('column', 'row')}>
      <Box align="center" direction="row" margin={{ right: 'small' }}>
        <PaginationButton
          disabled={!canPreviousPage}
          gap="2px"
          label="Previous"
          icon={<Icon name="ChevronLeft" size="xsmall" />}
          style={{ padding: '2px 4px' }}
          clickHandler={previousPage}
        />
        {pageNumbers.map((pageNumber) =>
          pageNumber === '...' ? (
            <Text key={nanoid()}>{pageNumber}</Text>
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
      <Box
        align="center"
        direction="row"
        margin={{ top: setResponsive('medium', 'none') }}
        style={{ position: 'relative' }}
      >
        {isInvalid && (
          <Box animation={{ type: 'fadeIn', duration: 500 }}>
            <InlineMessage
              color="error"
              height="16px"
              justify="center"
              label="Please enter a valid page number"
              iconSize="small"
              style={{ position: 'absolute', right: '-80px', top: '-24px' }}
            />
          </Box>
        )}
        <Text margin={{ right: 'xsmall' }}>Jump to page</Text>
        <Form onSubmit={handleSubmit}>
          <Box direction="row">
            <Box width="72px">
              <TextInput
                min="1"
                max={pageCount.toString()}
                type="number"
                value={userInput}
                onChange={(e) => handleChangeUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Box>
            <Button
              disabled={isInvalid}
              label="Go"
              margin={{ left: 'xsmall' }}
              secondary
              type="submit"
            />
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default Pagination
