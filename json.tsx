const formData = {
  title: 'Individual Abuse',
  formQuestions: [
    {
      question: {
        title:
          '<p style=\"margin: 0; padding: 0; font-weight: bold;\">MN Department of Human Services</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Office of Inspector General</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Licensing Division</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">245D HCBS SAMPLE FORM</p>',
        type: 'html',
      },
    },

    {
      question: {
        title: `<p style={{textAlign: "center}}> Individual Abuse Prevention Plan (IAPP)`,
        type: 'html',
      },
    },

    {
      question: {
        title:
          'This program is required to establish and enforce ongoing written individual abuse prevention plans as required under Minnesota Statutes, section 626.557 , subdivision 14 and section 245A.65 , subdivision 2 (b).',
        type: 'html',
      },
    },

    {
      question: {
        title:
          '<b> Development and review of the plan:</b> An individual abuse prevention plan shall be developed for each new person as part of the initial individual program plan or service plan required under the applicable licensing rule. The review and evaluation of the individual abuse prevention plan shall be done as part of the review of the program plan or service plan. The person receiving services shall participate in the development of the individual abuse prevention plan to the full extent of the person&#39;s abilities. If applicable, the person&#39;s legal representative shall be given the opportunity to participate with or for the person in the development of the plan. The interdisciplinary team shall document the review of all abuse prevention plans at least annually, using the individual assessment and any reports of abuse relating to the person. The plan shall be revised to reflect theresults of this review.',
        type: 'html',
      },
    },

    {
      question: {
        title:
          '<b>Plan contents:</b> The plan shall include a statement of measures that will be taken to minimize the risk of abuse to the vulnerable adult when the individual assessment required in section 626.557, subdivision 14, paragraph (b), indicates the need for measures in addition to the specific measures identified in the program abuse prevention plan. The measures shall include the specific actions the program will take to minimize the risk of abuse within the scope of the licensed services, and will identify referrals made when the vulnerable adult is susceptible to abuse outside the scope or control of the licensed services. When the assessment indicates that the vulnerable adult does not need specific risk reduction measures in addition to those identified in the program abuse prevention plan, the individual abuse prevention plan shall document this determination.',
        type: 'html',
      },
    },

    {
      question: {
        title:
          '<b>Requirements of 626.557 , subd. 14(b):</b> Each facility, including a home health care agency and personal care attendant services providers, shall develop an individual abuse prevention plan for each vulnerable adult residing there or receiving services from them. The plan shall contain an individualized assessment of: (1) the person&#39;s susceptibility to abuse by other individuals, including other vulnerable adults; (2) the person&#39;s risk of abusing other vulnerable adults; and (3) statements of the specific measures to be taken to minimize the risk of abuse to that person and other vulnerable adults. For the purposes of this paragraph, the term &quot;abuse&quot; includes self-abuse.',
        type: 'html',
      },
    },

    {
      question: {
        title:
          '<b>Persons with history of violent crime an act of physical aggression toward others:</b> If the program knows that the vulnerable adult has committed a violent crime or an act of physical aggression toward others, the individual abuse prevention plan must detail the measures to be taken to minimize the risk that the vulnerable adult might reasonably be expected to pose to visitors to the facility and persons outside the facility, if unsupervised. Under this section, a facility knows of a vulnerable adult&#39;s history of criminal misconduct or physical aggression if it receives such information from a law enforcement authority or through a medical record prepared by another facility, another health care provider, or the facility&#39;s ongoing assessments of the vulnerable adult..',
        type: 'html',
      },
    },

    {
      question: {
        title:
          'Legal Authority: MS §§ <span style{{color: blue}}> 245D.071 </span> , subd. 2, <span style{{color: blue}}> 245A.65 , </span>  subd. 2, and <span style{{color: blue}}> 626.557 , </span> subd. 14',
        type: 'html',
      },
    },

    {
      question: {
        title:
          '<p style=\"margin: 0; padding: 0; font-weight: bold;\">MN Department of Human Services</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Office of Inspector General</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Licensing Division</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">245D HCBS SAMPLE FORM</p>',
        type: 'html',
      },
    },

    {
      question: {
        title: `<p style={{textAlign: "center}}> Individual Abuse Prevention Plan (IAPP)`,
        type: 'html',
      },
    },

    {
      question: {
        title: `REQUIREMENTS FOR USE OF THIS SAMPLE DOCUMENT: 245D license holders are responsible for modifying this
sample for use in their program. At a minimum, you must fill in the blanks on this form. You may modify the
format and content to meet standards used by your program. This sample meets compliance with current
licensing requirements as of January 1, 2014. Providers remain responsible for reading, understanding and
ensuring that this document conforms to current licensing requirements. DELETE THIS HIGHLIGHTED SECTION
TO BEGIN MODIFYING THIS FORM.`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Name`,
        type: 'text',
      },
    },

    {
      question: {
        title: `Program:`,
        type: 'text',
      },
    },

    {
      question: {
        title: `<b> Instructions: </b> For each area, assess whether the person is susceptible to abuse by others and the person’s risk of
abusing other vulnerable people. If susceptible, indicate why by checking the appropriate reason or by adding a
reason. Identify specific measures to be taken to minimize the risk within the scope of licensed services and
identify referrals needed when the person is susceptible outside the scope or control of the licensed services. If
the person does not need specific risk reduction measures in addition to those identified in the program abuse
prevention plan, document this determination and identify the area of the program prevention plan that
addresses the area of susceptibility.`,
        type: 'html',
      },
    },

    {
      question: {
        title: 'A. Sexual abuse',
        type: 'radio',
        options: [
          {
            title: 'Is the person susceptible to abuse in this area?',
            type: 'radio',
            show: false,
          },

          {
            title: 'Yes (if any area below is checked)',
            type: 'radio',
            show: true,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },

          {
            title: 'Lack of understanding of sexuality',
            type: 'radio',
            show: true,
          },

          {
            title: 'Likely to seek or cooperate in an abusive situation',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inability to be assertive',
            type: 'radio',
            show: true,
          },

          {
            title: 'Other:',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title: `Specific measures to minimize risk of abuse for each area checked:`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Referrals made when the person is susceptible to abuse outside the scope or control of this program
(Identify the referral and the date it occurred).`,
        type: 'html',
      },
    },

    {
      question: {
        title: 'B. Physical Abuse',
        type: 'radio',
        options: [
          {
            title: 'Is the person susceptible to abuse in this area?',
            type: 'radio',
            show: false,
          },

          {
            title: 'Yes (if any area below is checked)',
            type: 'radio',
            show: true,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inability to identify potentially dangerous situations',
            type: 'radio',
            show: true,
          },

          {
            title: 'Lack of community orientation skills',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inappropriate interactions with others',
            type: 'radio',
            show: true,
          },

          {
            title: 'Other:',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title:
          '<p style=\"margin: 0; padding: 0; font-weight: bold;\">MN Department of Human Services</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Office of Inspector General</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">Licensing Division</p><p style=\"margin: 0; padding: 0; font-weight: bold;\">245D HCBS SAMPLE FORM</p>',
        type: 'html',
      },
    },

    {
      question: {
        title: 'B. Physical Abuse',
        type: 'radio',
        options: [
          {
            title: 'Is the person susceptible to abuse in this area?',
            type: 'radio',
            show: false,
          },

          {
            title: 'Yes (if any area below is checked)',
            type: 'radio',
            show: true,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inability to identify potentially dangerous situations',
            type: 'radio',
            show: true,
          },

          {
            title: 'Lack of community orientation skills',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inappropriate interactions with others',
            type: 'radio',
            show: true,
          },

          {
            title:
              'Inability to deal with verbally/physically aggressive persons',
            type: 'radio',
            show: true,
          },

          {
            title: 'Verbally/physically abusive to others',
            type: 'radio',
            show: true,
          },

          {
            title: '“Victim” history exists',
            type: 'radio',
            show: true,
          },

          {
            title: 'Other:',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title: `Specific measures to minimize risk of abuse for each area checked:`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Referrals made when the person is susceptible to abuse outside the scope or control of this program
(Identify the referral and the date it occurred).`,
        type: 'html',
      },
    },

    {
      question: {
        title: 'C. Self Abuse',
        type: 'radio',
        options: [
          {
            title: 'Is the person susceptible to abuse in this area?',
            type: 'radio',
            show: false,
          },

          {
            title: 'Yes (if any area below is checked)',
            type: 'radio',
            show: true,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },

          {
            title: 'Dresses inappropriately',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inability to care for self-help needs',
            type: 'radio',
            show: true,
          },

          {
            title: 'Lack of self-preservation skills (ignores personal safety)',
            type: 'radio',
            show: true,
          },

          {
            title: 'Engages in self-injurious behaviors',
            type: 'radio',
            show: true,
          },

          {
            title: 'Neglects or refuses to take medications',
            type: 'radio',
            show: true,
          },

          {
            title: 'Other:',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title: `Specific measures to minimize risk of abuse for each area checked:`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Referrals made when the person is susceptible to abuse outside the scope or control of this program
(Identify the referral and the date it occurred).`,
        type: 'html',
      },
    },

    {
      question: {
        title: 'D. Financial Exploitation',
        type: 'radio',
        options: [
          {
            title: 'Is the person susceptible to abuse in this area?',
            type: 'radio',
            show: false,
          },

          {
            title: 'Yes (if any area below is checked)',
            type: 'radio',
            show: true,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },

          {
            title: 'Inability to handle financial matters',
            type: 'radio',
            show: true,
          },

          {
            title: 'Other:',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title: `Specific measures to minimize risk of abuse for each area checked:`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Referrals made when the person is susceptible to abuse outside the scope or control of this program
(Identify the referral and the date it occurred).`,
        type: 'html',
      },
    },

    {
      question: {
        title:
          'Is the program aware of this person committing a violent crime or act of physical aggression toward others?',
        type: 'radio',
        options: [
          {
            title: 'Yes',
            type: 'radio',
            show: false,
          },

          {
            title: 'No',
            type: 'radio',
            show: true,
          },
        ],
      },
    },

    {
      question: {
        title: `Specific measures to be taken to minimize the risk this person might reasonably be expected to pose to
visitors to the program and persons outside the program, if unsupervised:`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Referrals made when the person is susceptible to abuse outside the scope or control of this program
(Identify the referral and the date it occurred).`,
        type: 'html',
      },
    },

    {
      question: {
        title: `An individual abuse prevention plan is developed for each new person as part of the initial service plan. The
person will participate in the development of the plan to the full extent of their ability. When applicable, the
person’s legal representative will be given the opportunity to participate with or for the person in the
development of the plan. The interdisciplinary team will document the review of the plan at least annually,
using an individual assessment, as required in MN Statutes, section 245D.071, subd. 3, and any reports of abuse
relating to the person. The plan shall be revised to reflect the results of this review.`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Signatures of those reviewing and/or participating in the development of this plan`,
        type: 'html',
      },
    },

    {
      question: {
        title: `Signatures of those reviewing and/or participating in the development of this plan`,
        type: 'html',
       
      },
    },
  ],
};
