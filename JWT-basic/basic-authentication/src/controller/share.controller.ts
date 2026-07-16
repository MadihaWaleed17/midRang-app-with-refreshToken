
import { Request, Response } from 'express';
import nodemailer from 'nodemailer'

export const connection = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SMPT,    
    pass: process.env.PASSWORD_SMPT     
  }
});

const sendEmail=()=>{
  return  `<div style="font-family:'Segoe UI',sans-serif;background:#f5f5f5;padding:30px;">
  <div style="max-width:650px;margin:auto;background:white;border-radius:18px;overflow:hidden;
              box-shadow:0 8px 25px rgba(0,0,0,0.15);">

    <!-- Header -->
    <div style="background:#d63384;padding:25px;text-align:center;color:white;">
      <h2 style="margin:0;font-size:26px;">💞 A Special Moment Just For You 💞</h2>
      <p style="margin:8px 0 0;font-size:15px;opacity:0.9;">From your Madiha, with love</p>
    </div>

    <!-- Couple Photo -->
    <div style="position:relative;">
      <img src="YOUR_COUPLE_PHOTO_URL" 
           alt="Our Picture"
           style="width:100%;display:block;object-fit:cover;max-height:380px;">
      
      <!-- Soft overlay gradient -->
      <div style="position:absolute;bottom:0;left:0;width:100%;height:120px;
                  background:linear-gradient(to top,rgba(0,0,0,0.55),transparent);"></div>

      <!-- Hug Button -->
      <a href="https://media.tenor.com/2roX3uxz_68AAAAC/hug.gif"
         style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);
                background:#ff4d94;padding:12px 28px;border-radius:30px;
                color:white;text-decoration:none;font-size:17px;font-weight:600;
                box-shadow:0 4px 12px rgba(0,0,0,0.25);">
        🤗 Click for a Big Hug
      </a>
    </div>

    <!-- Message -->
    <div style="padding:25px;">
      <p style="font-size:17px;color:#444;line-height:1.7;margin:0;">
        Assalamualaikum my love,  
        Kabhi kabhi dil karta hai ke bas tumhein yaad dilaaun ke  
        <strong style="color:#d63384;">you are my favorite person in the whole world.</strong>
      </p>

      <div style="margin:25px 0;padding:18px;border-radius:12px;background:#ffe6f2;text-align:center;">
        <p style="margin:0;font-size:18px;color:#d63384;">
          🌸 <em>“Tum ho tu sab kuch khoobsurat lagta hai.”</em> 🌸
        </p>
      </div>

      <p style="font-size:17px;color:#444;line-height:1.7;margin:0;">
        Bas itna hi…  
        <strong style="color:#d63384;">I love you, always.</strong>
      </p>

      <p style="text-align:center;margin-top:30px;font-size:15px;color:#999;">
        — Your Madiha 💕
      </p>
    </div>

  </div>
</div>

`
}

export const shareFile =async(req:Request,res:Response)=>{

  try{

    const data = req.body
  
      const option ={
          user: process.env.EMAIL_SMPT,
          to:"madiha.waleed17@gmail.com",
          subject:"new chapter begin",
            html: sendEmail()
    }

  await connection.sendMail(option)
    res.status(200).json({message:"email has been sent"})

  }

  catch(err)
  {
    if(err instanceof Error)
    {
        res.status(500).json({message:err.message})
    }
  }

}