import { Heading, Paragraph } from 'grommet'
import styled from 'styled-components'
import { links } from 'config'
import { Anchor } from 'components/Anchor'
import { List as ShardList } from 'components/List'
import { ListItem } from 'components/ListItem'
import { PageStatic } from 'components/PageStatic'

const List = styled(ShardList)`
  p {
    font-weight: 400;
  }
`

export const Terms = () => {
  const lastUpdated = 'March 2, 2018'

  return (
    <PageStatic pageTitle="Terms of Use -">
      <Heading
        level={1}
        margin={{ bottom: 'medium' }}
        size="medium"
        weight="600"
      >
        Terms of Use
      </Heading>
      <Paragraph>
        Welcome to the Alex’s Lemonade Childhood Cancer Data Lab, which is
        supported by Alex’s Lemonade Stand Foundation (<strong>"we,"</strong>{' '}
        <strong>"our,"</strong> or <strong>"us"</strong>). These Terms of Use
        (these <strong>"Terms"</strong>) are a binding legal agreement between
        you and us regarding your access to and use of the websites located at{' '}
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
        ,{' '}
        <Anchor
          label={links.refinebio}
          href={links.refinebio}
          rel="noopener noreferrer"
        />{' '}
        or any subdomains thereof and any embedded or associated software,
        applications, data or other content, provided or managed by us in
        connection with such websites (collectively, as may be updated, modified
        or replaced from time to time, the <strong>"CCDL"</strong>).
      </Paragraph>
      <Paragraph>
        Please read these Terms carefully. By accessing, registering for,
        downloading, installing or using the CCDL, or any software,
        applications, data or other content available on or through the CCDL
        (collectively, <strong>"Content"</strong> and any such data,{' '}
        <strong>"Data"</strong>), you agree to be bound by these Terms and to
        use the CCDL, including any Content, in accordance with these Terms. If
        you are using the CCDL on behalf of an entity, you represent and warrant
        that you have the legal authority to bind such entity to these Terms.
      </Paragraph>
      <Paragraph>
        In addition, when using certain features of the CCDL, you also will be
        subject to the policies, guidelines and terms applicable to such
        features (collectively, as may be updated from time to time,{' '}
        <strong>"Policies"</strong>). All Policies, including without limitation
        the CCDL Privacy Policy, are incorporated by reference into these Terms.
        If these Terms are inconsistent with any Policy, the terms in the Policy
        will control to the extent of the inconsistency with respect to the
        scope of the Policy. You hereby agree to the terms of the CCDL Privacy
        Policy, located at{' '}
        <Anchor
          label={links.ccdl_privacy_policy}
          href={links.ccdl_privacy_policy}
          rel="noopener noreferrer"
        />
        .
      </Paragraph>
      <Paragraph>
        We may periodically make changes to these Terms, and we will identify
        the date of last update below. We will post the updated Terms on the
        CCDL, and we will use commercially reasonable efforts to post changes in
        advance if we reasonably determine that such changes are material. We
        may also, in our discretion, use other commercially reasonable methods
        to attempt to notify you of such changes. Changes to these Terms will be
        effective upon posting on the CCDL. We encourage you to review the most
        recent version of these Terms frequently. If you continue to use the
        CCDL after we modify these Terms, you will be deemed to have consented
        to the updated Terms as of the date of the modification. If you do not
        agree to any provision of these Terms, you may not use the CCDL.
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
            Eligibility
          </Heading>
          <Paragraph>
            Use of the CCDL is void where prohibited. You represent and warrant
            that any information you submit in connection with the CCDL is
            accurate, current and complete, that you are 18 years of age or
            older (or your parent or guardian has reviewed and agreed to these
            Terms on your behalf), and that you are fully able and competent to
            enter into and abide by these Terms.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Account Registration
          </Heading>
          <Paragraph>
            When you register or seek authentication, you must (a)&nbsp;provide
            accurate, current and complete information, as prompted (
            <strong>"Registration Data"</strong>); (b) maintain the security of
            any logins, passwords, or other credentials that you select or that
            are provided to you for use on the CCDL; and (c) maintain and
            promptly update the Registration Data, and any other information you
            provide to us, and keep all such information accurate, current and
            complete. You must notify us as soon as practicable of any
            unauthorized use of your account or any other breach of security by
            emailing us at ccdl@alexslemonade.org.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Access to and Use of Content
          </Heading>
          <List
            display="block"
            listStyle="lower-alpha"
            listType="ol"
            margin={{ left: 'large', top: 'small' }}
            maxWidth="100%"
            width="auto"
          >
            <ListItem>
              <u>Limited License to You.</u> Subject to the terms and conditions
              of these Terms, we hereby grant you a limited, non-transferable,
              non-sublicensable, revocable license to use the CCDL solely for
              authorized research or academic purposes in accordance with these
              Terms.
            </ListItem>
            <ListItem>
              <u>Use Restrictions.</u> In connection with any access to or use
              of the CCDL (or any Content), you may not:
              <List
                display="block"
                listStyle="lower-roman"
                listType="ol"
                margin={{ left: 'large', top: 'small' }}
                maxWidth="100%"
                width="auto"
              >
                <ListItem>
                  publish, present or otherwise disclose Data, or results from
                  analysis of Data, obtained through the CCDL without properly
                  attributing (i) the Data source using the language provided by
                  the Data contributor of that Data set (as applicable), and
                  (ii) us using the language posted on the CCDL or otherwise
                  provided by us;
                </ListItem>
                <ListItem>
                  use or attempt to use Content to harm, marginalize, or
                  discriminate against individuals or populations;
                </ListItem>
                <ListItem>
                  identify, or make any attempt to identify, any individual to
                  which any Data pertains;
                </ListItem>
                <ListItem>
                  create a false identity, impersonate another individual or
                  entity in any way, or falsely imply that any third-party
                  service is associated with the CCDL;
                </ListItem>
                <ListItem>
                  upload or otherwise transmit to or through the CCDL any
                  Content that infringes, misappropriates, or violates any
                  third-party right; that violates, or causes us or our
                  affiliates to violate, any applicable law or regulation; that
                  is unlawful, harmful, harassing, defamatory, threatening,
                  hateful or otherwise objectionable or inappropriate; or that
                  can cause harm or delay to the CCDL (or any connected or
                  related systems) or can expose us or other Users to risk of
                  harm, damage, liability or loss;
                </ListItem>
                <ListItem>
                  upload or otherwise transmit to or through the CCDL any trade
                  secrets or information for which you have any obligation of
                  confidentiality or professional secrecy;
                </ListItem>
                <ListItem>
                  upload or otherwise transmit to or through the CCDL any
                  unsolicited or unauthorized advertising, promotional
                  materials, junk mail, spam, or any other form of solicitation
                  (commercial or otherwise);
                </ListItem>
                <ListItem>
                  distribute, disclose, market, rent, lease or otherwise
                  transfer the CCDL to any other individual or entity;
                </ListItem>
                <ListItem>
                  gain unauthorized access to the CCDL (or any associated
                  Content), to any other User’s account, or to any related or
                  connected systems;
                </ListItem>
                <ListItem>
                  post, transmit or otherwise make available any virus, worm,
                  spyware or any other computer code, file or program that may
                  or is intended to damage or hijack the operation of any
                  hardware, software, equipment or systems;
                </ListItem>
                <ListItem>
                  remove, disable, damage, bypass, circumvent or otherwise
                  interfere with any security-related features of the CCDL,
                  except that you may use passwords and other credentials we
                  provide solely as expressly authorized and intended;
                </ListItem>
                <ListItem>
                  interfere with or disrupt the CCDL (or any related or
                  connected systems) or violate the regulations, policies or
                  procedures of any CCDL-related systems;
                </ListItem>
                <ListItem>
                  violate these Terms or any applicable laws, regulations,
                  standards, principles or guidelines; or
                </ListItem>
                <ListItem>
                  assist or permit any persons in engaging in any of the
                  activities described above.
                </ListItem>
              </List>
            </ListItem>
          </List>
          <Paragraph>
            You must, immediately upon discovery, report to us any unauthorized
            access, use, alteration or disclosure of any Content, or other
            violation of these Terms, including as much detailed information as
            practicable. We (or our designee) may use any reasonable, lawful
            tools or methods to monitor use of the CCDL and compliance with
            these Terms.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Confidentiality
          </Heading>
          <Paragraph>
            Without limiting any other applicable obligations or restrictions,
            you will keep strictly confidential (using at least reasonable
            care), and not disclose or make available to any third party, any
            information you obtain or access via, regarding or in connection
            with the CCDL that is marked as confidential or should reasonably be
            treated as confidential (excluding information specifically
            identified by us or the source as non-confidential).
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Modifications to the CCDL
          </Heading>
          <Paragraph>
            We reserve the right to modify, discontinue and restrict,
            temporarily or permanently, all or part of the CCDL (including any
            Content) without notice in our sole discretion. Neither we nor our
            licensors, nor any other Users, will be liable to you or to any
            third party for any modification, discontinuance or restriction of
            the CCDL or any deletion of any Data or other Content stored on, or
            otherwise associated with, your account on the CCDL.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Term and Termination
          </Heading>
          <Paragraph>
            Your account (or other authorized access to the CCDL) remains in
            effect unless you cancel it or we terminate your access as provided
            by these Terms. Notwithstanding any other provision of these Terms,
            we reserve the right, without notice and in our sole discretion, to
            suspend or terminate your access and to block, restrict and prevent
            your future access to and use of the CCDL. Without limiting the
            generality of the foregoing, we may terminate your access in cases
            of actual or suspected fraud, abuse or violations of these Terms or
            applicable law, or to protect our organization or any Users from
            potential harm, disruption, damage, liability or loss. If your
            access is terminated for any reason, we reserve the right (but do
            not have the obligation) to delete any Data or other Content
            associated with your account. Upon any suspension or termination of
            your access, you must immediately cease using the CCDL. All
            provisions of these Terms that by their nature should survive
            (including, without limitation, provisions governing
            indemnification, limitations of liability, confidentiality, warranty
            disclaimers, use restrictions, and intellectual property rights)
            will continue to remain in full force and effect after any
            termination.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Feedback
          </Heading>
          <Paragraph>
            Any comments, suggestions, ideas or other information, related to
            the CCDL, submitted by you to us or the CCDL (collectively,{' '}
            <strong>"Feedback"</strong>) are non-confidential (notwithstanding
            any notice to the contrary you may include in any accompanying
            communication), and you hereby grant to us and our affiliates a
            non-exclusive, royalty-free, perpetual, irrevocable, worldwide,
            transferable and fully sublicensable right to use your Feedback for
            any purpose and in any manner without compensation or attribution to
            you. Where required by applicable law or regulation, we will respect
            any privacy restrictions applicable to Feedback you communicate to
            us.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Copyright Infringement
          </Heading>
          <Paragraph>
            We respect the intellectual property rights of others and ask you to
            do the same. It is our policy to terminate the access privileges of
            those who infringe the intellectual property rights of others. If
            you believe that your work has been posted on the CCDL in a way that
            constitutes copyright infringement, please contact us at the address
            below and provide the following information: (a) an electronic or
            physical signature of the person authorized to act on behalf of the
            owner of the copyright interest; (b) a description of the
            copyrighted work that you claim has been infringed, and
            identification of the time(s) and date(s) the material that you
            claim is infringing was displayed on the CCDL; (c) your address,
            telephone number, and email address; (d) a statement by you that you
            have a good faith belief that the disputed use is not authorized by
            the copyright owner, its agent, or the law; and (e) a statement by
            you, made under penalty of perjury, that the above information in
            your notice is accurate and that you are the copyright owner or
            authorized to act on the copyright owner’s behalf.
          </Paragraph>
          <Paragraph>
            If you believe that your User Content which has been removed (or to
            which access was disabled) is not infringing, or that you have the
            authorization from the copyright owner, the copyright owner's agent,
            or pursuant to applicable law, to post and use such User Content,
            you may send a counter-notice containing the following information
            to the copyright agent: (a) your physical or electronic signature;
            (b) identification of the User Content that has been removed or to
            which access has been disabled and the location at which the
            materials appeared before it was removed or disabled; (c) a
            statement that you have a good faith belief that the User Content
            was removed or disabled as a result of mistake or a
            misidentification of the User Content; and (d) your name, address,
            telephone number, and e-mail address, a statement that, to the
            extent permitted by applicable law, you consent to the jurisdiction
            of any federal or state court in the district or state in which you
            are located (or, if you are located outside of the US, any federal
            or state court in which we may be found), and a statement that you
            will accept service of process from the person who provided
            notification of the alleged infringement. If a counter-notice is
            received by the copyright agent, we may send a copy of the
            counter-notice to the original complaining party.
          </Paragraph>
          <Paragraph>
            Our designated agent for notice of copyright infringement can be
            reached at:
          </Paragraph>
          <Paragraph>
            <Anchor
              label={links.email_ccdl_alsf}
              href={`mailto:${links.email_ccdl_alsf}`}
              rel="noopener noreferrer"
            />
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Trademarks
          </Heading>
          <Paragraph>
            ALEX’S LEMONADE STAND®, and any other trademark, logo or other
            proprietary indicia contained on the CCDL, are trademarks or
            registered trademarks of ours and our licensors, and may not be
            copied, imitated or used, in whole or in part, without the prior
            written permission of the applicable trademark holder. Reference to
            any products, services, processes or other information, by trade
            name, trademark, manufacturer, supplier, or otherwise, does not
            constitute or imply endorsement, sponsorship, or recommendation
            thereof by us, or vice versa.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Ownership
          </Heading>
          <Paragraph>
            We, our affiliates and our licensors collectively own all right,
            title, and interest, including all intellectual property rights, in
            and to the CCDL. We reserve all rights not expressly granted to you
            in these Terms.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Third-Party Content
          </Heading>
          <Paragraph>
            The CCDL may contain links or otherwise provide access to Web pages,
            services, data or other content of third parties (collectively,{' '}
            <strong>"Third-Party Content"</strong>). Your access to or use of
            any Third-Party Content is at your sole risk. We do not monitor,
            endorse, or adopt, or have any control over, any Third-Party
            Content. Under no circumstances will we be responsible or liable in
            any way for or in connection with any Third-Party Content.
            Third-Party Content may be subject to separate terms and conditions.
            You should review, and you are solely responsible for complying
            with, any such third-party terms. You acknowledge and agree that we
            may use third-party vendors and hosting partners to provide the
            hardware, software, networking, storage, and related technology used
            to operate the CCDL.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Indemnification
          </Heading>
          <Paragraph>
            You will defend, indemnify and hold harmless us, our affiliates, and
            their respective directors, officers, agents, employees, licensors,
            and suppliers from and against all claims, losses, liabilities,
            damages, costs and expenses (including reasonable attorneys’ fees
            and expenses) arising out of or related to your User Content, your
            use of the CCDL (or any activity under your account or credentials),
            your violation of these Terms, or your violation of any rights of a
            third party, except to the extent arising from our gross negligence
            or willful misconduct.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Warranty Disclaimers
          </Heading>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            except as expressly set forth in these terms, to the fullest extent
            permissible under applicable law, (a) we hereby disclaim all
            warranties related to the ccdl, or any services, data or other
            content available thereon or associated therewith, including without
            limitation the implied warranties of merchantability,
            non-infringement and fitness for a particular purpose; and (b) the
            ccdl is provided "as is" and without any warranty related to
            accuracy, completeness, quality or that the ccdl will be
            uninterrupted or error free.Access to and Use of Content
          </Paragraph>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            <strong>
              we make no representations or warranties regarding, and explicitly
              disclaim the appropriateness or applicability of any content to,
              any specific patient’s care or treatment. nor do we make any
              representations or warranties regarding the use, or the results of
              the use, of any content in treatment. all content accessible in
              connection with the ccdl is for informational purposes only. data
              and other content are not a substitute for professional advice on
              any matter, medical or otherwise. always seek the advice of a
              qualified health professional. any clinician is expected to use
              independent medical judgment in the context of individual clinical
              circumstances of a specific patient’s care or treatment. we do not
              recommend or endorse any treatment, institution, professional,
              physician, product, procedure, or other information that may be
              mentioned in connection with the ccdl.
            </strong>
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Limitations of Liability
          </Heading>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            to the fullest extent permissible under applicable law, neither us
            nor our officers, directors, licensors, or suppliers will be liable
            to any party under these terms or otherwise for any indirect,
            incidental, special, consequential, or exemplary damages arising out
            of or in connection with the use or access of or inability to use or
            access the ccdl or any services or content made available through
            the ccdl, including without limitation damages for loss of profits,
            goodwill, use, data or other intangible losses (regardless of the
            basis of the claim and even if advised of the possibility of these
            damages).
          </Paragraph>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            to the fullest extent permissible under applicable law, our and our
            suppliers’ and licensors’ maximum total liability to you for all
            claims under these terms or otherwise in connection with the ccdl is
            $50, regardless of the basis of the claim.
          </Paragraph>
          <Paragraph style={{ textTransform: 'uppercase' }}>
            applicable law may not allow the limitation or exclusion of certain
            warranties or liabilities, so the above limitations or exclusions
            may not fully apply to you. in such cases, you agree that because
            such warranty disclaimers and limitations of liability reflect a
            reasonable and fair allocation of risk between you and us (and are
            fundamental elements of the basis of the bargain between you and
            us), our and our licensors’ and suppliers’ liability will be limited
            to the fullest extent permissible under applicable law. the
            limitations in this section will apply even if any limited remedy
            fails of its essential purpose, to the fullest extent permissible
            under applicable law.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Electronic Communications
          </Heading>
          <Paragraph>
            By accessing or using the CCDL, you consent to receiving electronic
            communications from us. You agree that any notices, agreements,
            disclosures, or other communications that we send to you
            electronically will satisfy any legal communication requirements,
            including that such communications be in writing.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Governing Law &amp; Jurisdiction
          </Heading>
          <List
            display="block"
            listStyle="lower-alpha"
            listType="ol"
            margin={{ left: 'large', top: 'small' }}
            maxWidth="100%"
            width="auto"
          >
            <ListItem>
              <u>Governing Law.</u> Unless otherwise agreed in writing between
              you and us, these Terms are governed by and construed in
              accordance with the laws of the Commonwealth of Pennsylvania,
              excluding conflicts of law principles.{' '}
            </ListItem>
            <ListItem>
              <u>Jurisdiction.</u> Unless otherwise agreed in writing between
              you and us, any dispute or claim arising out of or relating to the
              CCDL or these Terms must be brought exclusively in the state or
              federal courts within the Eastern District of Pennsylvania (except
              that a party may seek preliminary equitable relief in any court of
              competent jurisdiction in relation to intellectual property rights
              or confidentiality obligations).
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
            General
          </Heading>
          <Paragraph>
            Our failure to act in a particular circumstance does not waive our
            ability to act with respect to that circumstance or similar
            circumstances. We will not be responsible or liable for any failure
            or delay to perform any of our obligations under these Terms
            resulting from any event or circumstance beyond our reasonable
            control. Any provision of these Terms that is found to be invalid,
            unlawful, or unenforceable will be enforced to the fullest extent
            permissible under applicable law and in all other jurisdictions and
            circumstances (and otherwise will be severed from these Terms), and
            the remaining provisions of these Terms will continue to be in full
            force and effect. The section headings and titles in these Terms are
            for convenience only and have no legal or contractual effect. You
            may not assign or delegate any of your rights or obligations under
            these Terms without our prior written consent, and any purported
            assignment in contravention of the foregoing will be null and void.
            These Terms will be binding upon and enure to the benefit of the
            parties hereto and their respective successors and permitted
            assigns.{' '}
            <strong>
              Any dispute or claim arising out of or relating to the CCDL or
              these Terms must be commenced within one year after the claim
              arose.
            </strong>
          </Paragraph>
          <Paragraph>
            These Terms, including all Policies, constitute the entire agreement
            between you and us concerning the CCDL. These Terms supersede all
            prior agreements or communications between you and us regarding the
            subject matter of these Terms.
          </Paragraph>
        </ListItem>
        <ListItem>
          <Heading
            level={5}
            margin={{ bottom: 'xxsmall' }}
            weight="500"
            responsive={false}
          >
            Questions &amp; Contact Information
          </Heading>
          <Paragraph>
            If you have any questions or concerns about the CCDL, or these
            Terms, you may contact us by email at{' '}
            <Anchor
              label={links.email_ccdl_alsf}
              href={`mailto:${links.email_ccdl_alsf}`}
              rel="noopener noreferrer"
            />
            .
          </Paragraph>
        </ListItem>
      </List>
      <Paragraph>Last Updated: {lastUpdated}</Paragraph>
    </PageStatic>
  )
}
export default Terms
