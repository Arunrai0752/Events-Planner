import { response } from "express";
import sendEmail from "../utils/sendEmail.js";
import Public from "../models/contactModel.js";


export const GetAllContacts = async (req, res, next) => {
  try {
    const contacts = await Public.find();
    res.status(200).json({ message: "All Contacts Fetched", data: contacts });
  } catch (error) {
    next(error);
  }
};


export const UpdateContacts = async (req, res, next) => {
  try {
    const QueryId = req.params.Qid;
    const { status, reply } = req.body;

    // Validate status
    if (!["Pending", "Resolved", "Rejected"].includes(status)) {
      const error = new Error("Invalid status value");
      error.statusCode = 400;
      return next(error);
    }

    const updatedQuery = await Public.findByIdAndUpdate(
      QueryId,
      { status, reply },
      { new: true }
    );

    if (!updatedQuery) {
      const error = new Error("Contact query not found");
      error.statusCode = 404;
      return next(error);
    }

    // Status colors for UI
    const statusColors = {
      Pending: "#FFA500", // Orange
      Resolved: "#4BB543", // Green
      Rejected: "#FF3333", // Red
    };

    // User Notification Email
    const userMailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Your Query Status Update</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
        .header { background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
        .logo { max-width: 150px; }
        .content { padding: 20px; }
        .status { display: inline-block; padding: 6px 12px; border-radius: 20px; font-weight: bold; color: white; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center; }
        .info-label { font-weight: 600; color: #555; }
        .info-value { margin-bottom: 15px; }
        .reply-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0; color: #2c3e50;">Two Souls Event Planner</h2>
          <p style="margin: 5px 0 0; color: #7f8c8d;">We value your feedback</p>
        </div>
        
        <div class="content">
          <h3 style="margin-top: 0;">Dear ${updatedQuery.name},</h3>
          
          <p>We wanted to inform you about the status of your recent query:</p>
          
          <div style="margin: 20px 0;">
            <span class="info-label">Query Subject:</span>
            <div class="info-value">${updatedQuery.subject}</div>
            
            <span class="info-label">Your Message:</span>
            <div class="info-value">${updatedQuery.message}</div>
            
            ${reply ? `
            <span class="info-label">Our Response:</span>
            <div class="reply-box">${updatedQuery.reply}</div>
            ` : ''}
            
            <span class="info-label">Current Status:</span>
            <div>
              <span class="status" style="background-color: ${statusColors[status]}">
                ${status}
              </span>
            </div>
          </div>
          
          <p>If you have any further questions or need additional assistance, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>The Two Souls Team</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Two Souls Event Planner PVT. LTD. All rights reserved.</p>
          <p>Contact us at: support@twosouls.com | +91 9098209835</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Admin Confirmation Email
    const adminMailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Query Update Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
        .header { background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; }
        .status { display: inline-block; padding: 6px 12px; border-radius: 20px; font-weight: bold; color: white; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777; text-align: center; }
        .info-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .info-table th { text-align: left; padding: 8px; background-color: #f2f2f2; }
        .info-table td { padding: 8px; border-bottom: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0; color: #2c3e50;">Query Update Confirmation</h2>
          <p style="margin: 5px 0 0; color: #7f8c8d;">Admin Notification</p>
        </div>
        
        <div class="content">
          <h3 style="margin-top: 0;">Hello Admin,</h3>
          
          <p>The following query has been updated:</p>
          
          <table class="info-table">
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
            <tr>
              <td>Customer Name</td>
              <td>${updatedQuery.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>${updatedQuery.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>${updatedQuery.phone}</td>
            </tr>
            <tr>
              <td>Subject</td>
              <td>${updatedQuery.subject}</td>
            </tr>
            <tr>
              <td>Original Message</td>
              <td>${updatedQuery.message}</td>
            </tr>
            <tr>
              <td>Reply Sent</td>
              <td>${reply || 'No reply provided'}</td>
            </tr>
            <tr>
              <td>New Status</td>
              <td>
                <span class="status" style="background-color: ${statusColors[status]}">
                  ${status}
                </span>
              </td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td>${new Date(updatedQuery.updatedAt).toLocaleString()}</td>
            </tr>
          </table>
          
          <p>This action was performed by: ${req.user?.name || 'System'}</p>
        </div>
        
        <div class="footer">
          <p>© ${new Date().getFullYear()} Two Souls Event Planner PVT. LTD. Admin System</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send emails
    await Promise.all([
      sendEmail(updatedQuery.email, `Your Query Status: ${status}`, userMailBody),
      sendEmail('admin@twosouls.com', `Query Updated: ${updatedQuery.subject}`, adminMailBody)
    ]);

    res.status(200).json({
      success: true,
      message: "Contact updated and notifications sent",
      data: updatedQuery
    });

  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
