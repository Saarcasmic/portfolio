// src/pages/Contact.js

import React from 'react';
import styled from 'styled-components';
import ContactForm from '../components/ContactForm';

const ContactPageSection = styled.section`
  padding: 60px 20px;
  background: ${({ theme }) => theme.sectionBackground};
`;

const ContactPage = () => {
  return (
    <ContactPageSection>
      {/* <h2>Contact Me</h2> */}
      <ContactForm />
    </ContactPageSection>
  );
};

export default ContactPage;
