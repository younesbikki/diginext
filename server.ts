import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for checkout
  app.post("/api/checkout", async (req, res) => {
    const { name, surname, address, phone, email } = req.body;
    
    console.log("New Checkout Request Received:");
    console.log(`Name: ${name} ${surname}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Address: ${address}`);
    console.log("----------------------------");

    // Email sending logic
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || "diginextstore@gmail.com";

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: emailUser,
          to: receiverEmail,
          subject: `New Canva Pro Order: ${name} ${surname}`,
          text: `
            New Order Details:
            ------------------
            Name: ${name} ${surname}
            Email: ${email}
            Phone: ${phone}
            Address: ${address}
            
            Please contact the customer to complete the setup.
          `,
          html: `
            <h2>New Canva Pro Order</h2>
            <p><strong>Name:</strong> ${name} ${surname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <br>
            <p>Please contact the customer to complete the setup.</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to", receiverEmail);
      } catch (error) {
        console.error("Error sending email:", error);
        // We still return success to the user but log the error server-side
      }
    } else {
      console.warn("Email credentials missing. Email not sent.");
    }

    res.json({ 
      success: true, 
      message: "Your request has been sent to diginextstore@gmail.com. We will contact you shortly." 
    });
  });

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    
    console.log("New Contact Message Received:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log("----------------------------");

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || "diginextstore@gmail.com";

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const mailOptions = {
          from: emailUser,
          to: receiverEmail,
          subject: `New Contact Message from ${name}`,
          text: `
            New Contact Message:
            --------------------
            Name: ${name}
            Email: ${email}
            Message: ${message}
          `,
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("Contact email sent successfully to", receiverEmail);
      } catch (error) {
        console.error("Error sending contact email:", error);
      }
    }

    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
