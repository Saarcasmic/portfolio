// src/components/ContactForm.js

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from 'emailjs-com'; // Optional: If you choose to send emails via EmailJS

const ContactSection = styled.section`
  padding: 60px 20px;
  background: ${({ theme }) => theme.sectionBackground};
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 150px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 1rem;
  text-align: center;
`;

const schema = yup.object().shape({
  name: yup.string().required('Name is required').max(50, 'Name is too long'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required').max(500, 'Message is too long'),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Option 1: Send data to EmailJS
    
    emailjs
      .send(
        'service_r23bvzl',
        'template_jfuz18w',
        data,
        'g10hCE96RJKh4Tf3b'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSubmitted(true);
          reset();
        },
        (err) => {
          console.log('FAILED...', err);
        }
      );
    

    // Option 2: Log data to console (Replace with your backend integration)
    console.log('Form Data:', data);
    setSubmitted(true);
    reset();
  };

return (
    <ContactSection>
    <h2>Contact Me</h2>
    <div className='flex flex-row justify-center items-start'>
        {/* Left Column for Email and Phone */}
        <div className='flex flex-col items-start mr-10' style={{ minWidth: '250px' }}>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem', marginBottom: '10px' }}>Email: agrawalsaar16@gmail.com</p>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Phone: +91 8791567123</p>
        </div>

        {/* Right Column for the Contact Form */}
        <div className='flex flex-col'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register('email')} />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="message">Message</Label>
                    <TextArea id="message" {...register('message')} />
                    {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
                </FormGroup>
                {/* Optional: Add CAPTCHA here */}
                <SubmitButton type="submit">Send Message</SubmitButton>
                {submitted && <SuccessMessage>Your message has been sent successfully!</SuccessMessage>}
            </Form>
        </div>
    </div>
</ContactSection>
);
};

export default ContactForm;
