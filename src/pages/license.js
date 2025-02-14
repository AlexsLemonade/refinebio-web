import { Heading, Paragraph } from 'grommet'
import { List } from 'components/List'
import { ListItem } from 'components/ListItem'
import { PageStatic } from 'components/PageStatic'

export const License = () => (
  <PageStatic pageTitle="License -">
    <Heading level={1} margin={{ bottom: 'medium' }} size="medium" weight="600">
      BSD 3-Clause License
    </Heading>
    <Paragraph>
      Copyright &copy; 2017-2018, Greene Laboratory, University of Pennsylvania
      and Childhood Cancer Data Lab, Alex's Lemonade Stand Foundation. All
      rights reserved.
    </Paragraph>
    <Paragraph>
      Redistribution and use in source and binary forms, with or without
      modification, are permitted provided that the following conditions are
      met:
    </Paragraph>
    <List
      display="block"
      listStyle="decimal"
      margin={{ left: 'large', top: 'small' }}
    >
      <ListItem>
        Redistributions of source code must retain the above copyright notice,
        this list of conditions and the following disclaimer.
      </ListItem>
      <ListItem>
        Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
      </ListItem>
      <ListItem>
        Neither the name of the copyright holder nor the names of its
        contributors may be used to endorse or promote products derived from
        this software without specific prior written permission.
      </ListItem>
    </List>
    <Paragraph>
      THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
      IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
      THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
      PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
      CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
      EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
      PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
      PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
      LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
      NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
      SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    </Paragraph>
  </PageStatic>
)

export default License
