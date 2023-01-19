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
        public static bool SendingEmailMethod(string UserEmailAddress, string StringInfo, string CreationTime, string EmailMessage)// Here StringInfo will behave based on EmailMessage either as JobTitle or UniqueUserGuid
        {
            bool isEmailSent = true;
            try
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

            }
            catch (Exception e)
            {
                isEmailSent = false;
            }
            return isEmailSent;
        }
    }
}

