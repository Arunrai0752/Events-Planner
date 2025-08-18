import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import gentoken from "../utils/auth.js";
import Deactivation from "../models/deactivationModel.js";
import sendEmail from "../utils/sendEmail.js";


export const registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    if (!firstname || !lastname || !email || !phonenumber || !password) {
      const error = new Error("All Fields Requeried");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.status === "Active") {
      const error = new Error("Email pahle se Register Hai");
      error.statusCode = 400;
      return next(error);
    }




    const hashedpass = await bcrypt.hash(password, 10);
    const profilePic = `https://placehold.co/600x400?text=${firstname
      .charAt(0)
      .toUpperCase()}${lastname.charAt(0).toUpperCase()}`;

    if (existingUser && existingUser.status === "Inactive") {
      existingUser.firstname = firstname;
      existingUser.lastname = lastname;
      existingUser.password = hashedpass;
      existingUser.status = "Active";
      existingUser.photo = profilePic;
      existingUser.role = "User"
      await existingUser.save();

    }
    else {
      const newUser = await User.create({
        firstname,
        lastname,
        email,
        phonenumber,
        password: hashedpass,
        photo: profilePic,
      });
    }


    res.status(201).json({ message: "Registation Succecfull" });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Fields Required");
      error.statusCode = 409;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User Not registered");
      error.statusCode = 408;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, user.password);
    
    if (!isVerified) {
      const error = new Error("Invalid Username or Password");
      error.statusCode = 401;
      return next(error);
    }

    gentoken(user._id, res);

    res.status(200).json({
      message: `WelcomeBack ${user.firstname} ${user.lastname}`,
      data: user,
    });
  } catch (error) {
    next(error); 
  }
};

export const Deactivateuser = async (req, res, next,) => {

  try {
    const currentUser = req.user;
    const { password, reason, feedback } = req.body;

    if (!currentUser) {
      const error = new Error("USer NOt Found Login Again")
      error.statusCode = 401;
      return next(error);
    }

     const userMailBody = `
   <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Your Account Status Update | Two Souls</title>
  <style>
    /* Modern Email Styles */
    body { 
      font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.6; 
      color: #333333;
      background-color: #f7fafc;
      margin: 0;
      padding: 20px;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px; 
      text-align: center; 
      color: white;
    }
    .logo { 
      max-width: 180px;
      margin-bottom: 15px;
    }
    .content { 
      padding: 30px; 
    }
    .highlight-box {
      background-color: #f8f5ff;
      border-left: 4px solid #667eea;
      padding: 18px;
      margin: 20px 0;
      border-radius: 0 8px 8px 0;
    }
    .footer { 
      margin-top: 30px; 
      padding: 20px; 
      background: #f8f9fa; 
      font-size: 13px; 
      color: #718096; 
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      margin: 15px 0;
    }
    .urgent {
      color: #d53f8c;
      font-weight: 600;
    }
    .hindi {
      font-family: 'Segoe UI', 'Nirmala UI', sans-serif;
      color: #4a5568;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header with Gradient -->
    <div class="header">
      <img src="https://twosouls.com/logo-white.png" alt="Two Souls Logo" class="logo">
      <h1 style="margin: 10px 0 5px; font-size: 24px;">Account Status Update</h1>
      <p style="margin: 0; opacity: 0.9;">Important information about your account</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <h3 style="margin-top: 0; color: #2d3748;">Dear ${currentUser.firstname},</h3>
      
      <p>We're reaching out regarding your Two Souls Event Planner account.</p>
      
      <div class="highlight-box">
        <p class="hindi">आपका अकाउंट अस्थायी रूप से निष्क्रिय कर दिया गया है।</p>
        <p class="urgent">(Your account has been temporarily deactivated)</p>
      </div>
      
      <p class="hindi">अगर आप हमारे साथ जुड़ना चाहते हैं, तो कृपया 30 दिनों के अंदर वापस आएं।</p>
      <p>(If you wish to continue with us, please reactivate within 30 days.)</p>
      
      <p class="hindi">नोट: 30 दिनों के बाद आपका सभी डेटा स्थायी रूप से हटा दिया जाएगा।</p>
      <p><strong>Note:</strong> After 30 days, all your data will be permanently deleted.</p>
      
      <center>
        <a href="http://localhost:5173/register" class="button">Reactivate Your Account</a>
      </center>
      
      <p>If you have any questions or need assistance, our support team is here to help:</p>
      <ul style="padding-left: 20px;">
        <li>Email: support@twosouls.com</li>
        <li>Phone: +91 9098209835</li>
        <li>Hours: Mon-Sat, 10AM to 7PM</li>
      </ul>
      
      <p>Warm regards,<br>
      <strong>The Two Souls Team</strong></p>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>© ${new Date().getFullYear()} Two Souls Event Planner PVT. LTD. All rights reserved.</p>
      <p>
        <a href="https://twosouls.com" style="color: #667eea; text-decoration: none;">Our Website</a> | 
        <a href="https://twosouls.com/privacy" style="color: #667eea; text-decoration: none;">Privacy Policy</a> | 
        <a href="https://twosouls.com/contact" style="color: #667eea; text-decoration: none;">Contact Us</a>
      </p>
      <p style="margin-top: 10px; font-size: 12px;">
        This is an automated message. Please do not reply directly to this email.
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        gender: "N/A",
        occupation: "N/A",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        district: "N/A",
        representing: "N/A",
        photo: "N/A",
        role: "N/A",
        password: "N/A",
        status: "Inactive",
      },
      { new: true }
    );

    


      sendEmail(currentUser.email , `Your Account  gya bhai`, userMailBody),


    await Deactivation.create({ userId: currentUser._id, reason, feedback });
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Account Deactivated Successfully" });
  } catch (error) {
    next(error);
  }
};


export const LogoutUser = (req, res, next) => {
  try {
    res.cookie("IDCard", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    next(error);
  }
};