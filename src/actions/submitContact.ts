'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import nodemailer from 'nodemailer'

export async function submitContact(prevState: any, formData: FormData) {
  const payload = await getPayload({ config })

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    // 1. Save to Database
    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        company,
        message,
      },
    })

    // 2. Send "Awwwards Style" Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Taxnisi Web" <${process.env.EMAIL_USER}>`,
      to: 'mnalwafi2004@gmail.com', // Your receiving email
      subject: `New Inquiry: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n"${message}"`, // Fallback
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            img { -ms-interpolation-mode: bicubic; }
          </style>
        </head>
        <body style="background-color: #f4f4f4; font-family: Helvetica, Arial, sans-serif; padding: 40px 0;">
          
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border: 1px solid #111111; box-shadow: 10px 10px 0px rgba(0,0,0,0.05);">
            
            <div style="border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-family: 'Times New Roman', serif; font-size: 28px; font-weight: bold; letter-spacing: -1px; text-transform: uppercase; color: #000;">
                Taxnisi
              </span>
              <span style="font-family: 'Courier New', monospace; font-size: 11px; text-transform: uppercase; background: #000; color: #fff; padding: 6px 12px; letter-spacing: 1px;">
                New Lead
              </span>
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
              <tr>
                <td width="30%" style="font-family: 'Courier New', monospace; font-size: 11px; text-transform: uppercase; color: #888; padding-bottom: 12px; vertical-align: top;">From</td>
                <td style="font-size: 16px; font-weight: bold; color: #111; padding-bottom: 12px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="font-family: 'Courier New', monospace; font-size: 11px; text-transform: uppercase; color: #888; padding-top: 12px; padding-bottom: 12px; vertical-align: top;">Email</td>
                <td style="font-size: 16px; color: #111; padding-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
                  <a href="mailto:${email}" style="color: #111; text-decoration: none; border-bottom: 1px solid #000;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="font-family: 'Courier New', monospace; font-size: 11px; text-transform: uppercase; color: #888; padding-top: 12px; padding-bottom: 12px; vertical-align: top;">Company</td>
                <td style="font-size: 16px; color: #111; padding-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #eee;">${company || '—'}</td>
              </tr>
            </table>

            <div style="margin-bottom: 50px;">
              <div style="font-family: 'Courier New', monospace; font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 20px;">Message Content</div>
              <div style="font-family: 'Times New Roman', serif; font-size: 24px; line-height: 1.4; color: #111;">
                “${message.replace(/\n/g, '<br>')}”
              </div>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}" style="background: #111; color: #fff; text-decoration: none; padding: 18px 40px; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; display: inline-block; font-weight: bold;">
                Reply Now
              </a>
              <p style="margin-top: 30px; font-family: 'Courier New', monospace; font-size: 10px; color: #aaa; text-transform: uppercase;">
                Sent from Taxnisi Web V1
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error('Form Error:', error)
    return { success: false, error: 'Failed to submit message' }
  }
}
