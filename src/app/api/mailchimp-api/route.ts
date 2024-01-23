import { NextResponse } from 'next/server'
const client = require('@mailchimp/mailchimp_marketing')

const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX
const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID

if (!mailchimpApiKey || !mailchimpServerPrefix || !mailchimpAudienceId) {
  throw new Error(
    'Please define `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX` and `MAILCHIMP_AUDIENCE_ID` in your `.env` file',
  )
}

client.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServerPrefix,
})

export async function POST(event: Request) {
  const { email } = await event.json()
  console.log('Received event', email)
  try {
    const response = await client.lists.addListMember(mailchimpAudienceId, {
      email_address: email,
      status: 'pending',
    })

    if (!response.id) {
      console.error('Error adding contact to Mailchimp', {
        response: response,
      })

      return {
        statusCode: response.status,
        body: JSON.stringify({
          success: false,
        }),
      }
    }

    return NextResponse.json({
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Contact added successfully',
      }),
    })
  } catch (error: any) {
    console.error('Error adding contact to Mailchimp', {
      error: error?.response?.body || error,
      status: error?.status,
      fields: event.body,
    })

    return {
      statusCode: error?.status || 400,
      body: JSON.stringify({
        success: false,
        message: error?.response?.body || error || 'Unknown error',
      }),
    }
  }
}
