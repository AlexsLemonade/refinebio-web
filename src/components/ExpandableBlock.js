import { BoxBlock } from 'components/BoxBlock'

export const ExpandableBlock = ({
  duration = '.8s',
  expand,
  opacity = 0.75,
  maxHeight = '99vh',
  timing = 'cubic-bezier(.61,.36,.24,1.05)',
  children,
  ...props
}) => {
  return (
    <BoxBlock
      margin={{ bottom: 'xsmall' }}
      style={{
        opacity: expand ? 1 : opacity,
        overflow: 'hidden',
        maxHeight: expand ? maxHeight : 0,
        transition: `all ${duration} ${timing}`
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </BoxBlock>
  )
}

export default ExpandableBlock
