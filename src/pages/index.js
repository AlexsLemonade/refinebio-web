import { useState } from 'react'
import {
  Box,
  CheckBox,
  Heading,
  Paragraph,
  RadioButton,
  RadioButtonGroup,
  Select,
  Tab,
  Tabs,
  Text,
  Anchor
} from 'grommet'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Input } from 'components/shared/Input'
import { NavDropDown } from 'components/header/NavDropDown'
import { NavLink } from 'components/header/NavLink'
import { Pill } from 'components/shared/Pill'
import { Logo } from 'components/header/Logo'
import styled from 'styled-components'

// TEMPORARY
const Section = styled(Box)`
  background: #fff;
  boxshadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px';
  margin: 10px 20px;
  padding: 20px 40px 60px;
`

const Home = () => {
  const [value, setValue] = useState('Mene Option')
  const [radioValue, setRadioValue] = useState('Option')
  const [checked, setChecked] = useState(false)

  return (
    <Box background="gray-shade-20" pad="10px 10%">
      <Heading level="1" size="large">
        Refinebio Style Guide
      </Heading>
      {/* ============ Font Styles ============ */}
      <Section>
        <Heading level={1} size="large">
          Font Styles
        </Heading>
        <Box direction="row">
          <Box direction="row">
            <Box margin={{ right: '60px' }}>
              <Heading level={1}>Rubik</Heading>
              <Heading level={1} size="large">
                Title
              </Heading>
              <Heading level={2} size="large">
                Sub-title
              </Heading>
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
            </Box>
            <Box margin={{ right: '60px' }}>
              <Heading level={1} style={{ color: 'white' }}>
                ___
              </Heading>
              <Heading level={1} size="large">
                32px
              </Heading>
              <Heading level={2} size="large">
                28px
              </Heading>
              <Heading level={1}>26px</Heading>
              <Heading level={2}>26px</Heading>
              <Heading level={3}>20px</Heading>
              <Heading level={4}>18px</Heading>
              <Heading level={5}>16px</Heading>
            </Box>
          </Box>
          <Box>
            <Paragraph size="xlarge">Lato</Paragraph>
            <Box direction="row" margin={{ bottom: '20px' }}>
              <Box margin={{ right: '60px' }}>
                <Paragraph>Lato Body Text 16px</Paragraph>
                <Paragraph>
                  <strong>Lato Body Text 16px</strong>
                </Paragraph>
                <Paragraph>
                  <i>Lato Body Text 16px</i>
                </Paragraph>
              </Box>
              <Box margin={{ right: '60px' }}>
                <Paragraph size="small">Lato Caption 14px</Paragraph>
                <Paragraph size="xsmall">Lato Label 12px</Paragraph>
              </Box>
              <Box>
                <Paragraph>
                  <Anchor>Lato Body Link 16px</Anchor>
                </Paragraph>
                <Text weight="bold">
                  <Anchor>Lato Body Link 16px</Anchor>
                </Text>
              </Box>
            </Box>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in
              consectetur nibh, sit amet pulvinar velit.{' '}
              <strong>Nam tellus</strong> est, egestas porttitor viverra mattis,
              accumsan pellentesque ante. Etiam nulla ipsum, molestie et est
              vitae.
            </Paragraph>
            <Paragraph>
              "<i>Morbi ut diam facilisis, gravida quam</i>", hendrerit massa.
              Pellentesque nec interdum diam. <strong>Phasellus</strong> ornare
              accumsan. Etiam eu turpis in eros gravida fermentum.
            </Paragraph>
          </Box>
        </Box>
      </Section>
      {/* ============ Buttons ============ */}
      <Section>
        <Heading level={1} size="large">
          Buttons
        </Heading>
        <Box direction="row">
          {/* Button */}
          <Box>
            <Box direction="row" margin={{ bottom: '60px' }}>
              <Box margin={{ right: '60px' }}>
                <Heading level={2}>Regular Buttons</Heading>
                <Heading level={3}>Primary</Heading>
                <Box direction="row">
                  <Box pad="small">
                    <Text size="small" margin={{ bottom: '10px' }}>
                      (Normal)
                    </Text>
                    <Button primary label="Download" />
                  </Box>
                  <Box pad="small">
                    <Text size="small" margin={{ bottom: '10px' }}>
                      (Disabled)
                    </Text>

                    <Button primary disabled label="Download" />
                  </Box>
                  <Box align="center" background="brand" pad="small">
                    <Text
                      color="white"
                      size="small"
                      margin={{ bottom: '10px' }}
                    >
                      (with bg)
                    </Text>
                    <Button primary className="light" label="Sign Up" />
                  </Box>
                </Box>
              </Box>
              <Box pad={{ top: '40px' }}>
                <Heading level={3}>Secondary</Heading>
                <Box direction="row">
                  <Box pad="small">
                    <Text size="small" margin={{ bottom: '10px' }}>
                      (Normal)
                    </Text>
                    <Button secondary label="View Samples" />
                  </Box>
                  <Box pad="small">
                    <Text size="small" margin={{ bottom: '10px' }}>
                      (Disabled)
                    </Text>
                    <Button secondary disabled label="View Samples" />
                  </Box>
                  <Box align="center" background="brand" pad="small">
                    <Text
                      color="white"
                      size="small"
                      margin={{ bottom: '10px' }}
                    >
                      (with bg)
                    </Text>
                    <Button secondary className="light" label="View Samples" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box direction="row">
          {/* Tabbed Buttons */}
          <Box width="max-content" margin={{ right: '60px' }}>
            <Heading level={2}>Tabbed Buttons</Heading>
            <Tabs>
              <Tab title="Species View">
                <Box pad="medium" />
              </Tab>
              <Tab title="Experiment View">
                <Box pad="medium" />
              </Tab>
            </Tabs>
          </Box>
          {/* Text Buttons */}
          <Box>
            <Heading level={2}>Text Buttons</Heading>
            <Tabs className="text">
              <Tab title="Normalized Compendia">
                <Box pad="medium" />
              </Tab>
              <Tab title="RNA-seq Sample Compendia">
                <Box pad="medium" />
              </Tab>
            </Tabs>
          </Box>
        </Box>
        <Box>
          <Box direction="row">
            {/* Badged Buttons */}
            <Box>
              <Heading level={2}>Badged Buttuns</Heading>
              <div style={{ display: 'flex' }}>
                <Box margin={{ right: '60px' }}>
                  <Box margin="small">
                    <Text size="small">(Normal)</Text>
                  </Box>
                  <Box margin="small">
                    <Button
                      badge={{ max: 10000, value: 1 }}
                      label="View Samples"
                    />
                  </Box>
                  <Box margin="small">
                    <Button
                      badge={{ max: 10000, value: 99 }}
                      label="View Samples"
                    />
                  </Box>
                </Box>
                <Box align="center" background="brand" pad="small">
                  <Text color="white" size="small">
                    (with bg)
                  </Text>
                  <Box margin={{ top: '8px' }}>
                    <Box margin="small">
                      <Button
                        badge={{
                          max: 10000,
                          value: 1,
                          background: { color: 'white' }
                        }}
                        label="View Samples"
                        light
                      />
                    </Box>
                    <Box margin="small">
                      <Button
                        badge={{
                          max: 10000,
                          value: 99,
                          background: { color: 'white' }
                        }}
                        label="View Samples"
                        light
                      />
                    </Box>
                  </Box>
                </Box>
              </div>
            </Box>
          </Box>
        </Box>
      </Section>
      {/* ============ Inline Messages ============ */}
      <Section>
        <Heading level={1} size="large">
          Inline Messages
        </Heading>
        <Paragraph margin={{ bottom: '10px' }}>
          <strong>Status:</strong> success | info | error
        </Paragraph>
        <Box direction="row">
          <InlineMessage
            label="Added to Dataset"
            status="success"
            pad={{ right: '20px' }}
          />
          <InlineMessage
            label="Platform not supported"
            status="info"
            pad={{ right: '20px' }}
          />
          <InlineMessage label="Encountered an error" status="error" />
          <InlineMessage
            label="Error message with no icon"
            labelOnly
            status="error"
            margin={{ left: '20px' }}
          />
        </Box>
      </Section>
      {/* ============ Navigation ============ */}
      <Section>
        <Heading level={1} size="large">
          Navigation
        </Heading>
        <Box direction="row">
          <Box margin={{ right: '80px' }}>
            <Heading level={2}>Logo</Heading>
            <Box pad={{ horizontal: 'medium', vertical: 'small' }}>
              <Text size="small" margin={{ bottom: '10px' }}>
                (Normal)
              </Text>
              <Logo />
            </Box>
            <Box
              background="brand"
              pad={{ horizontal: 'medium', vertical: 'small' }}
            >
              <Text color="white" size="small" margin={{ bottom: '10px' }}>
                (with bg)
              </Text>
              <Logo light />
            </Box>
          </Box>
          <Box>
            <Heading level={2}>Links</Heading>
            <Box margin={{ right: '10px' }}>
              <Text size="small" margin={{ bottom: '10px' }}>
                (Normal)
              </Text>
              <Box margin={{ bottom: '16px' }}>
                <NavLink>Search</NavLink>
              </Box>
              <NavDropDown
                label="Search"
                items={[
                  { label: 'Menu Item 1', onClick: () => {} },
                  { label: 'Menu Item 2', onClick: () => {} }
                ]}
              />
            </Box>
          </Box>
          <Box
            background="brand"
            pad={{ horizontal: 'medium', top: '40px' }}
            height="250px"
          >
            <Text color="white" size="small" margin={{ bottom: '10px' }}>
              (with bg)
            </Text>
            <Box margin={{ bottom: '16px' }}>
              <NavLink light>Search</NavLink>
            </Box>
            <NavDropDown
              className="light"
              label="Search"
              items={[
                { label: 'Menu Item 1', onClick: () => {} },
                { label: 'Menu Item 2', onClick: () => {} }
              ]}
            />
          </Box>
        </Box>
      </Section>
      {/* ============ Badges ============ */}
      <Section>
        <Heading level={1} size="large">
          Badges
        </Heading>
        <Box direction="row">
          <Box margin={{ right: '60px' }}>
            <Heading level={2}>Processing Info Badges</Heading>
            <Paragraph margin={{ bottom: '10px' }}>
              <strong>Status:</strong> success | info | warning
            </Paragraph>
            <Box direction="row" margin={{ right: '60px' }}>
              <Box margin={{ right: '60px' }}>
                <Box margin={{ bottom: '10px' }}>
                  <Pill label="refinebio processed" status="success" />
                </Box>
                <Box margin={{ bottom: '10px' }}>
                  <Pill label="Quantile normailzation skipped" status="info" />
                </Box>
                <Box margin={{ bottom: '10px' }}>
                  <Pill label="Submitter processed" status="warning" />
                </Box>
              </Box>
              <Box>
                <Box margin={{ bottom: '10px' }}>
                  <Text size="small" margin={{ bottom: '10px' }}>
                    (Any color)
                  </Text>
                  <Pill
                    background="gray-shade-5"
                    color="black"
                    label="Custom color"
                  />
                </Box>
                <Box margin={{ bottom: '10px' }}>
                  <Text size="small" margin={{ bottom: '10px' }}>
                    (Label only)
                  </Text>
                  <Pill
                    background="pastel-green-tint-90"
                    label="Label only"
                    labelOnly
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Heading level={2}>Icon Badges</Heading>
            <Box direction="row">
              <IconBadge name="Accession" />
              <IconBadge name="Organism" />
              <IconBadge name="MicroArray" />
              <IconBadge name="MixedPlatform" />
              <IconBadge name="Rna" />
              <IconBadge name="Samples" />
              <IconBadge name="Help" />
            </Box>
            <Box margin={{ top: '60px' }}>
              <Heading level={2}>Icon Labeled Badges</Heading>
              <IconBadge label="Label 1" name="Accession" />
              <IconBadge label="Label 2" name="Help" margin={{ top: '16px' }} />
            </Box>
          </Box>
        </Box>
      </Section>
      {/* ============ Form Elements ============ */}
      <Section>
        <Heading level={1} size="large">
          Form Elements
        </Heading>
        <Box direction="row">
          {/* Text Input */}
          <Box margin={{ right: '60px', bottom: '20px' }}>
            <Heading level={2}>Text Input</Heading>
            <Text size="small" margin={{ bottom: '10px' }}>
              (Normal)
            </Text>
            <Input placeholder="label" />
          </Box>
          {/* Error Text Input */}
          <Box pad={{ top: '50px', bottom: '60px' }}>
            <InlineMessage label="Error Message" labelOnly status="error" />
            <Input error value="Invalid" />
          </Box>
        </Box>
        <Box direction="row">
          {/* Select */}
          <Box margin={{ bottom: '60px' }}>
            <Heading level={2}>Select</Heading>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box margin={{ right: '60px' }}>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Normal)
                </Text>
                <Select
                  options={[
                    'Mene Option',
                    'Mene Option 1',
                    'Mene Option 2',
                    'Mene Option 3'
                  ]}
                  value={value}
                  onChange={({ option }) => setValue(option)}
                />
              </Box>
              <Box>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Disabled)
                </Text>
                <Select
                  options={['Mene Option']}
                  defaultValue="Mene Option"
                  disabled
                />
              </Box>
            </div>
          </Box>
        </Box>
        <Box direction="row">
          {/* Radio Button */}
          <Box>
            <Heading level={2}>Radio Button</Heading>
            <Box direction="row" margin={{ right: '60px' }}>
              <Box margin={{ right: '60px' }}>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Normal)
                </Text>
                <RadioButtonGroup
                  name="radio"
                  options={['Option 1', 'Option 2']}
                  value={radioValue}
                  onChange={(event) => setRadioValue(event.target.value)}
                />
              </Box>
              <Box>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Disabled)
                </Text>
                <RadioButton disabled name="radio" />
              </Box>
            </Box>
          </Box>
          {/* Check Box */}
          <Box>
            <Heading level={2}>Check Box</Heading>
            <Box direction="row">
              <Box margin={{ right: '60px' }}>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Normal)
                </Text>
                <CheckBox
                  checked={checked}
                  label="Label"
                  onChange={(event) => setChecked(event.target.checked)}
                />
              </Box>
              <Box margin={{ top: '4px', right: '80px' }}>
                <Text size="small" margin={{ bottom: '10px' }}>
                  (Disable)
                </Text>
                <CheckBox disabled />
              </Box>
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  )
}

export default Home
