import { Heading, Paragraph } from 'grommet'
import styled from 'styled-components'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { List as ShardList } from 'components/shared/List'
import { ListItem } from 'components/shared/ListItem'
import { PageStatic } from 'components/shared/PageStatic'

const List = styled(ShardList)`
  p {
    font-weight: 400;
  }
`

export const Privacy = () => {
  const lastUpdated = 'March 2, 2018'

  return (
    <PageStatic pageTitle="Privacy -">
      <Heading
        level={1}
        margin={{ bottom: 'medium' }}
        size="medium"
        weight="600"
      >
        Privacy Policy
      </Heading>
      <Paragraph>
        This database and websites, located at{' '}
        <Anchor
          label={links.ccdl}
          href={links.ccdl}
          rel="noopener noreferrer"
        />
        ,{' '}
        <Anchor
          label={links.cognoma}
          href={links.cognoma}
          rel="noopener noreferrer"
        />
        , and{' '}
        <Anchor
          label={links.refinebio}
          href={links.refinebio}
          rel="noopener noreferrer"
        />{' '}
        or any subdomains thereof (the <strong>"CCDL"</strong>), is supported by
        Alex’s Lemonade Stand Foundation (<strong>"we,"</strong>{' '}
        <strong>"our,"</strong> or <strong>"us"</strong>).
      </Paragraph>
      <Paragraph>
        Your access to, and use of, the CCDL is subject to our Terms of Use,
        located at <Anchor label={`${links.refinebio}/terms`} href="/terms" />{' '}
        (the <strong>"Terms of Use"</strong>). We have created this Privacy
        Policy (this <strong>"Privacy Policy"</strong>) to explain what
        information we gather when you visit or interact with the CCDL, how we
        and others may use your information, and the security approaches we use
        to protect your information. This Privacy Policy is incorporated into
        and made part of the Terms of Use. Capitalized terms used but not
        defined in this Privacy Policy have the meanings given to them in the
        Terms of Use.
      </Paragraph>
      <Paragraph>
        By using the CCDL, you consent to the collection and use of your
        information in accordance with this Privacy Policy. If we decide to
        change this Privacy Policy, we will post the updated version on this
        page. Changes to this Privacy Policy will apply only to information
        collected after the date of the change.
      </Paragraph>
      <List
        display="block"
        fontWeight="bold"
        listStyle="decimal"
        margin={{ left: 'small', top: 'small' }}
      >
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            What information is gathered?
          </Heading>
          <Paragraph>
            We may collect and retain information from or about you when you
            register on the CCDL, seek authentication, send or respond to
            communications, or participate in another CCDL feature. Here are the
            types of personal information we gather:
          </Paragraph>
          <List
            display="block"
            listStyle="circle"
            listType="ul"
            margin={{ left: 'large', top: 'small' }}
            maxWidth="100%"
            width="auto"
          >
            <ListItem>
              <strong>Information You Give Us:</strong> When registering or
              seeking authentication, or otherwise communicating with us, we may
              ask you for your name, email address, mailing address, phone
              number, credentials or other similar information.
            </ListItem>
            <ListItem>
              <strong>Automatic Information:</strong> We receive and store
              certain types of information whenever you interact with us,
              including IP addresses and session identifiers. We may use
              "cookies" or other tracking tools to enhance your experience and
              gather information about Users and visits to the CCDL. Please
              refer to the "May we use 'cookies' or other tracking tools?"
              section below for information about cookies and how we may use
              them.
            </ListItem>
            <ListItem>
              <strong>Information from Other Sources:</strong> For purposes such
              as authentication, monitoring, completeness or accuracy, we may
              receive information about you from other sources, including third
              parties you have authorized to share information with us, and we
              may add or relate such information to your account.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            How do we respond to "Do Not Track" signals?
          </Heading>
          <Paragraph>
            Because there is not yet a common understanding of how to interpret
            web browser-based "Do Not Track" (<strong>"DNT"</strong>) signals
            other than cookies, we do not currently respond to, or provide Users
            with a different CCDL experience based on, undefined "DNT" signals
            to the CCDL.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            How do we use your personal information?
          </Heading>
          <Paragraph>
            We may use your personal information in any of the following ways:
          </Paragraph>
          <List
            display="block"
            listStyle="circle"
            listType="ul"
            margin={{ left: 'large', top: 'small' }}
            maxWidth="100%"
            width="auto"
          >
            <ListItem>To authenticate or update your information.</ListItem>
            <ListItem>To administer your account or profile.</ListItem>
            <ListItem>
              To respond to your support requests or otherwise communicate with
              you.
            </ListItem>
            <ListItem>
              To provide or facilitate any services or transactions associated
              with your account.
            </ListItem>
            <ListItem>
              To personalize and optimize your CCDL experience and to learn
              about your preferences.
            </ListItem>
            <ListItem>
              To monitor your compliance with the Terms of Use and all
              applicable Policies.
            </ListItem>
            <ListItem>
              To prevent or remedy any unauthorized or disruptive activity.
            </ListItem>
            <ListItem>To administer a survey or other CCDL feature.</ListItem>
            <ListItem>
              To operate, maintain, analyze, improve, control, or customize the
              CCDL.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Do we disclose the information we collect?
          </Heading>
          <Paragraph>
            We generally do not sell, trade, or otherwise transfer personal
            information to outside parties unless we provide you with advance
            notice. However, we may disclose personal information as described
            below:
          </Paragraph>
          <List
            display="block"
            listStyle="circle"
            listType="ul"
            margin={{ left: 'large', top: 'small' }}
            maxWidth="100%"
            width="auto"
          >
            <ListItem>
              <strong>Agents and Contractors:</strong> We may contract with
              other companies and individuals to operate the CCDL and to perform
              functions on our behalf. Examples include maintaining and hosting
              the CCDL, analyzing data, and providing support. Our agents and
              contractors have access to personal information needed to perform
              their functions, but they must reasonably safeguard such
              information and they may not use it or disclose it for other
              purposes.
            </ListItem>
            <ListItem>
              <strong>Authentication:</strong> We may disclose your personal
              information to third parties as reasonably necessary to
              authenticate you and your information, as applicable.
            </ListItem>
            <ListItem>
              <strong>Business Transfers:</strong> In the event that we sell or
              otherwise transfer our assets, or reorganize, merge or transfer
              our entity, we may provide your information to the purchaser to
              enable continued use of the CCDL. We will take reasonable steps to
              seek similar treatment of your information, but the purchaser
              might operate under a different privacy policy.
            </ListItem>
            <ListItem>
              <strong>Protection of Us and Others:</strong> We release personal
              information when we believe it is appropriate to comply with law;
              enforce or apply the Terms of Use or our other applicable Policies
              or agreements; or protect the rights, privacy, property, or safety
              of us, Users or others. We may share information regarding
              unauthorized or suspicious activity with affected Users, an
              independent Institutional Review Board or other ethics board, or
              institutional authorities, as applicable.
            </ListItem>
          </List>
          <Paragraph>
            Subject to applicable law, we may share aggregated and statistical
            information with third parties.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            How is personal information corrected or updated?
          </Heading>
          <Paragraph>
            You can correct or update your personal information by
            re-registering, updating your profile, or by contacting us at{' '}
            <Anchor
              label={links.email_ccdl_alsf}
              href={`mailto:${links.email_ccdl_alsf}`}
              rel="noopener noreferrer"
            />
            . You can also request that we delete your personal information or
            remove you from our communications.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            May we use "cookies" or other tracking tools?
          </Heading>
          <Paragraph>
            Yes. We may use web tracking tools such as cookies and web beacons.
            A cookie is a small data file that certain websites write to your
            hard drive when you visit those pages, but the only personal
            information a cookie can contain is information you supply yourself.
            We may use cookies to track User traffic patterns when you click on
            various links throughout the CCDL to help us understand your
            preferences and to offer better experiences and tools on the CCDL.
          </Paragraph>
          <Paragraph>
            We may contract with third party service providers to assist us in
            better understanding our Users, including tracking User clicks and
            recording anonymized User sessions. These service providers are not
            permitted to use the information collected on our behalf, except to
            help us conduct and improve the CCDL.
          </Paragraph>
          <Paragraph>
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies, through your
            browser settings. Each browser is a little different, so look at
            your browser Help menu to learn the correct way to modify your
            cookies. If you turn cookies off, you might not be able to access or
            use certain CCDL services, features or functionality.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            How secure is personal information?
          </Heading>
          <Paragraph>
            We follow generally accepted industry security standards to
            safeguard and help prevent unauthorized access, maintain data
            security, and properly use your personal information. However, no
            commercial method of information transfer over the Internet or
            electronic data storage is known to be 100% secure. As a result, we
            cannot guarantee the absolute security of that information during
            its transmission or its storage in our systems.
          </Paragraph>
          <Paragraph>
            It is important for you to protect against unauthorized access to
            your password, API keys and other identifying tokens, and to your
            computer. Be sure to sign off when you are finished using the CCDL.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Third Party Links
          </Heading>
          <Paragraph>
            In an attempt to provide you with increased value, we may include
            third party links on the CCDL. These linked sites have separate and
            independent privacy policies, which we encourage you to review. We
            therefore have no responsibility or liability for the content and
            activities of these linked sites. Nonetheless, we seek to protect
            the integrity of the CCDL and welcome any feedback about these
            linked sites (including if a specific link does not work).
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Questions and Feedback
          </Heading>
          <Paragraph>
            Any questions or feedback about the CCDL or this Privacy Policy
            should be directed to{' '}
            <Anchor
              label={links.email_ccdl_alsf}
              href={`mailto:${links.email_ccdl_alsf}`}
              rel="noopener noreferrer"
            />
            .
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Important Notices to Non-United States Residents
          </Heading>
          <Paragraph>
            It is important to note that the CCDL is operated in the United
            States. If you are located outside of the United States, please be
            aware that any personal information you provide to us will be
            transferred to the United States. By using the CCDL and/or providing
            us with your personal information, you consent to this transfer.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Children's Privacy
          </Heading>
          <Paragraph>
            We do not knowingly intend to collect personal information from
            children under 13 years of age. If a child has provided us with
            personal information, a parent or guardian of that child may send an
            email message to{' '}
            <Anchor
              label={links.email_ccdl_alsf}
              href={`mailto:${links.email_ccdl_alsf}`}
              rel="noopener noreferrer"
            />{' '}
            with "Request for Child Information Removal" in the subject line and
            the name and age of the child in the body of the message. After
            confirmation, we will make reasonable efforts to delete the child’s
            information from the database that stores information for the CCDL.
          </Paragraph>
        </ListItem>
      </List>
      <Paragraph>Last Updated: {lastUpdated}</Paragraph>
    </PageStatic>
  )
}

export default Privacy
