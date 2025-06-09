const formData = {
  title: 'AUTHORIZATION AND AGREEMENT FOR INJECTABLE MEDICATIONS',
  formQuestions: [
    {
      question: {
        title: 'Name',
        type: 'text',
      },
    },

    {
      question: {
        title: 'Date of birth:',
        type: 'text',
      },
    },

    {
      question: {
        title: `<div>
  <p>
    Injectable medications may be administered according to prescriber’s order and written instructions when one of the
    following has been met:
  </p>
  <ol>
    <li>
      A registered nurse or licensed practical nurse will administer the injections;
    </li>
    <li>
      A supervising registered nurse with a physician’s order has delegated the administration of injectable medication
      to an unlicensed staff member and has provided the necessary training;
    </li>
    <li>
      There is an agreement signed by the company’s Designated Coordinator and/or Designated Manager and the
      person served and/or legal representative specifying what injections may be given, when, how, and that the
      prescriber must retain responsibility for the license holder’s giving the injections.
    </li>
  </ol>
</div>
`,
        type: 'html',
      },
    },

    {
      question: {
        title:
          'The following injectable medications that are marked with an “X” have a prescriber’s order and written instructions and may be given:',
        type: 'radio',
        SubQuestion: [
          {
            title: 'Epi-pen',
            type: 'radio',
          },

          {
            title: 'Pre-drawn Insulin Syringes',
            type: 'radio',
          },

          {
            title: 'Insulin Pens',
            type: 'radio',
          },

          {
            title: 'Glucagon – Specific instructions attached',
            type: 'radio',
          },

          {
            title: 'Other:',
            type: 'radio',
          },
        ],
      },
    },

    {
      question: {
        title:
          'For the above checked injectable medications, please provide information regarding:',
        type: 'text',
        SubQuestion: [
          {
            title: 'When the medication may be given:',
            type: 'text',
          },

          {
            title: 'How the medication may be given:',
            type: 'text',
          },
        ],
      },
    },

    {
      question: {
        title:
          'A health care professional or pharmacist will prepare specified dosages in advance according to a prescriber’s order. Staff will administer the medication according to the prescriber’s order and written instructions and only after receiving specific training by a registered nurse or licensed health care professional. Staff who have not been specifically trained will not administer any injectable medication.',
        type: 'html',
      },
    },

    {
      question: {
        title:
          'Only a licensed health care professional will administer psychotropic medications by injection.',
        type: 'html',
        SubQuestion: [
          {
            title: 'Person served and/or legal representative',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'text',
          },

          {
            title: 'Prescriber',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'text',
          },

          {
            title: 'Designated Coordinator and/or Designated Manager signature',
            type: 'Signature',
          },

          {
            title: 'Date',
            type: 'text',
          },
        ],
      },
    },
  ],
};
