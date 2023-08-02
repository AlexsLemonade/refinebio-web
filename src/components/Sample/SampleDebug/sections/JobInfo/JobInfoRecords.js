import { useSampleDebug } from 'hooks/useSampleDebug'
import moment from 'moment'
import { nanoid } from 'nanoid'
import { Box, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { TableCell, TableRow } from './JobInfoTable'

export const JobInfoRecords = ({ job }) => {
  const { isFileSelected } = useSampleDebug()
  const dataFormat = 'MM/DD/YYYY HH:mm'
  const jobOOMKilled = job.start_time && !job.end_time && !job.failure_reason
  const textColor = job.success ? 'success' : 'error'

  return (
    <>
      <TableRow
        key={job.id}
        color={textColor}
        selected={job.original_files?.some(isFileSelected)}
      >
        <TableCell>
          <Anchor
            color="inherit"
            href={`https://api.refine.bio/v1/jobs/${
              job.type === 'processor' ? 'processor' : 'downloader'
            }/${job.id}`}
            label={job.id}
            rel="noopener noreferrer"
            target="_blank"
            underline
          />
        </TableCell>
        <TableCell
          title={job.is_queued ? 'This job is currently running' : null}
        >
          {job.type === 'processor'
            ? `${job.pipeline_applied} (${job.ram_amount})`
            : job.downloader_task}{' '}
          {job.is_queued ? <Icon name="Sync" size="small" /> : null}
        </TableCell>
        <TableCell>{job.num_retries}</TableCell>
        <TableCell>{job.retried ? 'yes' : 'no'}</TableCell>
        <TableCell>{job.worker_version}</TableCell>
        <TableCell>
          {job.created_at && moment(job.created_at).format(dataFormat)}
        </TableCell>
        <TableCell>
          {job.start_time
            ? moment(job.start_time).format(dataFormat)
            : '(no start_time)'}
          {job.start_time && job.end_time
            ? ` (${moment
                .duration(moment(job.end_time).diff(job.start_time))
                .humanize()})`
            : ' (no end_time)'}
        </TableCell>
      </TableRow>
      {(job.failure_reason || job.success === false) && (
        <TableRow
          color={textColor}
          selected={job.original_files?.some(isFileSelected)}
        >
          <TableCell />
          <TableCell colSpan="8">
            {jobOOMKilled ? (
              'Looks like the job was OOM-Killed (no failure_reason)'
            ) : (
              <Box margin={{ top: '-28px' }}>
                {job.failure_reason
                  ? job.failure_reason
                      .split('\\n')
                      .map((fragment) => <Text key={nanoid()}>{fragment}</Text>)
                  : 'No failure reason'}
              </Box>
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default JobInfoRecords
