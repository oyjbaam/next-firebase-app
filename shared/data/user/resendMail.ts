import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_URL

/**
 * @param 사용자 이메일
 * @param 생성된 토큰
 */
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${CLIENT_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email. </p>`,
  })
}
