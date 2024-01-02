import * as React from 'react'

interface EmailTemplateProps {
  VerificationLink: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  VerificationLink,
}) => (
  <div>
    <h1>Welcome, {VerificationLink}!</h1>
  </div>
)
