import { memo } from 'react'
import { useSampleDebug } from 'hooks/useSampleDebug'
import { Box, Heading, Table } from 'grommet'
import { JobInfoRecords } from './JobInfoRecords'
import { TableBody, TableCell, TableHeader, TableRow } from './JobInfoTable'

export const JobInfo = () => {
  const {
    data: { jobs }
  } = useSampleDebug()

  const fields = [
    'id',
    '',
    'num retries',
    'worker_version',
    'created at',
    'running time'
  ]

  return (
    <Box pad={{ bottom: 'xlarge' }}>
      <Box margin={{ bottom: 'xsmall' }}>
        <Heading level={3}>Downloader and Processor Job Info</Heading>
      </Box>
      <Box style={{ overflow: 'auto' }}>
        <Table>
          <TableHeader>
            <TableRow>
              {fields.map((field) => (
                <TableCell key={field} scope="col">
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs &&
              jobs.map((job) => <JobInfoRecords key={job.id} job={job} />)}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

export default memo(JobInfo)
