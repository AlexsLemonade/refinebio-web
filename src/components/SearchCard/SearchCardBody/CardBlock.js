import { Heading, Text } from 'grommet'

export const CardBlock = ({ content, emptyText, heading, isValue }) =>
  isValue ? (
    <>
      <Heading level={4} weight="500">
        {heading}
      </Heading>
      {content}
    </>
  ) : (
    <Text color="gray-shade-40">
      <i>{emptyText}</i>
    </Text>
  )

export default CardBlock
