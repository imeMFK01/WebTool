using System;
using System.IO;
using System.Net;
//using System.Net.Mail;
using MailKit;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;


namespace PerceptronXfmsSimulationService.Utilities
{
    public static class SendingEmail
    {
        public static void SendingEmailMethod(string UserEmailAddress, string StringInfo, string CreationTime, string EmailMessage)// Here StringInfo will behave based on EmailMessage either as JobTitle or UniqueUserGuid
        {
            string Path = @"C:\PerceptronXFMSInfo\";
            StreamReader ReadPerceptronXFMSEmailAddress = new StreamReader(Path + "PerceptronXFMSEmailAddress.txt");
            StreamReader ReadPerceptronXFMSEmailPassword = new StreamReader(Path + "PerceptronXFMSData.txt");
            string PerceptronXFMSEmailAddress = ReadPerceptronXFMSEmailAddress.ReadLine();
            string PerceptronXFMSEmailAddressPassword = ReadPerceptronXFMSEmailPassword.ReadLine();

            string BaseUrl = "https://perceptronxfms.lums.edu.pk/";
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(PerceptronXFMSEmailAddress));
            email.To.Add(MailboxAddress.Parse(UserEmailAddress));


            if (EmailMessage == "Error") // Email Msg for Something Wrong With Entered Query     // StringInfo 
            {
                email.Subject = "PERCEPTRON-XFMS: XFMS Search Query Failed";

                email.Body = new TextPart(TextFormat.Html)
                {
                    Text =
               "Dear User," +
                "<br/><br/> Your submitted search query couldn't successfully completed with the \"" + StringInfo + "\" job title. Please check your search parameters and data files." +
                "</br><br/> For assistance in submitting a search, please visit the <a href=\'" + BaseUrl + "/index.html#/getting \'>Getting Started</a> page" +
                    " and see our <a href=\'https://www.youtube.com/playlist?list=PLaNVq-kFOn0Zu7xi94YiTauT2e5fxYLcz'>Video Tutorials</a>. <br/><br/>If " +
                    "problem still persists, please <a href=\'" + BaseUrl + "index.html#/contact'> contact</a> us." +

                    "</br><br/>Thank You for using Perceptron-XFMS." +
                "</br><br/><b>The PERCEPTRON-XFMS Team</b>" +
                "</br>Biomedical Informatics & Engineering Research Laboratory (BIRL)," +
                "</br>Department of Life Sciences, SBA School of Science and Engineering," +
                "</br>Lahore University of Management Sciences (LUMS), Lahore, Pakistan" +
                "</br>Voice: +92 42 3560 8352" +
                "</br>Email: <a href=\'mailto:perceptronxfms@lums.edu.pk'>perceptronxfms@lums.edu.pk</a>" +
                "</br>Web: <a href='http://biolabs.lums.edu.pk/birl'>biolabs.lums.edu.pk/birl</a>"
                    //"</br></br>Thank You for using Perceptron-XFMS." +
                    //"</br><b>The PERCEPTRON-XFMS Team</b>" +
                    //"</br>Biomedical Informatics & Engineering Research Laboratory (BIRL), Lahore University of Management Sciences (LUMS), Pakistan"
                };
            }
            else if (EmailMessage == "QuerySuccessfullyCompleted")
            {
                email.Subject = "PERCEPTRON-XFMS: XFMS Search Query Successfully Completed";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text =
                "Dear User," +
                "<br/><br/>Your protein search query successfully completed with the \"" +
                        StringInfo + "\" job title.<br/><br/>You can visualize and download your results at <a href=\'" + BaseUrl + "index.html#/history \'>User Search History</a>." +
                "</br><br/>For interpretation of the results, please visit the <a href=\'" + BaseUrl + "index.html#/help \'>Help & Manual</a> page " +
                "and see our <a href=\'https://www.youtube.com/playlist?list=PLaNVq-kFOn0Zu7xi94YiTauT2e5fxYLcz'>Video Tutorials</a>." +

                "</br><br/>Thank You for using Perceptron-XFMS." +
                "</br><br/><b>The PERCEPTRON-XFMS Team</b>" +
                "</br>Biomedical Informatics & Engineering Research Laboratory (BIRL)," +
                "</br>Department of Life Sciences, SBA School of Science and Engineering," +
                "</br>Lahore University of Management Sciences (LUMS), Lahore, Pakistan" +
                "</br>Voice: +92 42 3560 8352" +
                "</br>Email: <a href=\'mailto:perceptronxfms@lums.edu.pk'>perceptronxfms@lums.edu.pk</a>" +
                "</br>Web: <a href='http://biolabs.lums.edu.pk/birl'>biolabs.lums.edu.pk/birl</a>"
                };
            }



            //email.Subject = "Test Email Subject";
            //email.Body = new TextPart(TextFormat.Html) { Text = "<h1>Example HTML Message Body</h1>" };

            // send email
            using (SmtpClient smtp = new SmtpClient())
            {
                smtp.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);       // https://learn.microsoft.com/es-es/dotnet/api/system.net.mail.smtpclient?redirectedfrom=MSDN&view=netframework-4.7.2 // https://jasonwatmore.com/post/2021/09/02/net-5-send-an-email-via-smtp-with-mailkit
                smtp.Authenticate(PerceptronXFMSEmailAddress, PerceptronXFMSEmailAddressPassword);
                smtp.Send(email);
                smtp.Disconnect(true);
            }

            int a = 1;

            //using (var mm = new MailMessage(PerceptronXFMSEmailAddress, UserEmailAddress))
            //{
            //    string BaseUrl = "https://perceptronxfms.lums.edu.pk/";


            //    if (EmailMessage == "Error") // Email Msg for Something Wrong With Entered Query     // StringInfo 
            //    {
            //        mm.Subject = "PERCEPTRON-XFMS: XFMS Search Query Not Submitted";
            //        var body = "Dear User,";
            //        body += "<br/><br/> Search query couldn't submitted with job title \"" + StringInfo + "\" please check your search parameters and data files.";
            //        //body += "&nbsp;<a href=\'" + BaseUrl + "/index.html#/scans/" + p.Queryid + " \'>link</a>.";
            //        body += "</br> If you need help check out the <a href=\'" + BaseUrl + "/index.html#/getting \'>Getting Started</a> guide" +
            //            " and our <a href=\'https://www.youtube.com/playlist?list=PLaNVq-kFOn0Zu7xi94YiTauT2e5fxYLcz'>Video Tutorials</a>. If " +
            //            "problem still persists, please <a href=\'" + BaseUrl + "index.html#/contact'> contact</a> us.";

            //        body += "</br></br>Thank You for using Perceptron-XFMS.";
            //        body += "</br><b>The PERCEPTRON-XFMS Team</b>";
            //        body += "</br>Biomedical Informatics & Engineering Research Laboratory (BIRL), Lahore University of Management Sciences (LUMS), Pakistan";
            //        mm.Body = body;
            //    }
            //    else if (EmailMessage == "QuerySuccessfullySubmitted")
            //    {
            //            mm.Subject = "PERCEPTRON-XFMS: XFMS Search Query Submitted";
            //            var body = "Dear User,";
            //            body += "<br/><br/> Your protein search query successfully submitted at " + CreationTime + " with job title \"" +
            //                    StringInfo + "\" Please check your query status at <a href=\'" + BaseUrl + "index.html#/history \'>User Search History</a>.";
            //            body += "</br> If you need help check out the <a href=\'" + BaseUrl + "index.html#/getting \'>Getting Started</a> guide " +
            //            "and our <a href=\'https://www.youtube.com/playlist?list=PLaNVq-kFOn0Zu7xi94YiTauT2e5fxYLcz'>Video Tutorials</a>.";

            //            body += "</br></br>Thank You for using Perceptron-XFMS.";
            //            body += "</br><b>The PERCEPTRON-XFMS Team</b>";
            //            body += "</br>Biomedical Informatics & Engineering Research Laboratory (BIRL), Lahore University of Management Sciences (LUMS), Pakistan";
            //            mm.Body = body;
            //    }
            //    //else if (EmailMessage == "PerceptronSdkEmailVerification")
            //    //{
            //    //    mm.Subject = "PERCEPTRON-XFMS SDK: Email Verification";
            //    //    var body = "Dear User,";
            //    //    body += "<br/> To complete your Calling PERCEPTRON-XFMS API sign up, we just need to verify your email address: " + UserEmailAddress +
            //    //        ". So, please copy the below line ";
            //    //    body += "<br/> UserUniqueId = '" + StringInfo + "'" + 
            //    //        "<br/>and paste into the function of VerfiyingEmailAddress as instructed you there.";
            //    //    body += "</br>Once verified, you can start using Calling PERCEPTRON API for proteoform search.";

            //    //    body += "</br></br>Thank You for using Perceptron.";
            //    //    body += "</br><b>The PERCEPTRON-XFMS Team</b>";
            //    //    body += "</br>Biomedical Informatics & Engineering Research Laboratory (BIRL), Lahore University of Management Sciences (LUMS), Pakistan";
            //    //    mm.Body = body;
            //    //}

            //    mm.IsBodyHtml = true;
            //    var networkCred = new NetworkCredential(PerceptronXFMSEmailAddress, PerceptronXFMSEmailAddressPassword);
            //    var smtp = new SmtpClient
            //    {
            //        Host = "smtp.office365.com",
            //        EnableSsl = true,
            //        UseDefaultCredentials = false,
            //        Credentials = networkCred,
            //        Port = 587
            //    };
            //    try
            //    {
            //        smtp.Send(mm);
            //    }
            //    catch (Exception e)
            //    {
            //        if (e is System.Net.Mail.SmtpException)
            //            UserEmailAddress = "das bad";

            //    }
            //}
        }
    }
}











//int port = 587;
//string host = "smtp.office365.com";
//string username = "smtp.out@mail.com";
//string password = "password";
//string mailFrom = "noreply@mail.com";
//string mailTo = "mailto@mail.com";
//string mailTitle = "Testtitle";
//string mailMessage = "Testmessage";

//var message = new MimeMessage();
//message.From.Add(new MailboxAddress(mailFrom));
//            message.To.Add(new MailboxAddress(mailTo));
//            message.Subject = mailTitle;
//            message.Body = new TextPart("plain") { Text = mailMessage };

//            using (var client = new SmtpClient())
//            {
//                client.Connect(host, port, SecureSocketOptions.StartTls);
//                client.Authenticate(username, password);

//                client.Send(message);
//                client.Disconnect(true);
//            }

