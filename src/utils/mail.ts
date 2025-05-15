import "server-only";

import sgMail from "@sendgrid/mail";

export const DEFAULT_TEMPLATE_ID = "d-9cd4a8590a15458598ad31faed6309e1";

type EmailPayload = {
  to: string;
  subject?: string;
  cc?: string;
  replyTo?: string;
  dynamicTemplateData?: { [key: string]: any };
} & ({ text: string } | { html: string } | { templateId: string });

export async function sendEmail(data: EmailPayload) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  return sgMail.send({
    ...data,
    from: process.env.EMAIL_FROM as string,
    trackingSettings: {
      clickTracking: {
        enable: false,
      },
    },
  });
}

// import nodemailer from "nodemailer";
// export async function sendEmail(data: EmailPayload) {
//   const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);
//   return await transporter.sendMail({
//     ...data,
//     from: process.env.EMAIL_FROM,
//   });
// }
