PHP-Mailer
==========

Enquiry Form to send data via gmail's SMTP protocol.

* PHPMailer code copied into this project is popular code for sending emails from PHP
* Integrated SMTP support - sent without a local mail server
* PHPMailer provides an SPL-compatible autoloader the preferred way of loading the PHP Mailer library 
  - just make sure to include:
      require '/path/to/PHPMailerAutoload.php

Data entered into the enquiry form is first validated using jQuery, looping through each field to ensure that all 
required fields have a value and that the email and postcode are according to pattern stipulated using regex. The
normal form submit is prevented so as not to reload the page - nicer user experience as page jumps to the top and 
refreshes any animations start again, returning false stops normal submit.

The $.post ajax method is called with serialized form data and sends it to the sendmail.php where the settings for 
gmail's mail SMTP connection settings are configured, a success or fail message is echo'd from this file to appear on the index.html page.

##(1) PHP installation

This project was developed using WebMatrix which upon creating a php file auto installed PHP into:
      c:\Program Files(x86)\IIS Express\PHP\v5.3\
to ensure that WebMatrix could run php on it's own IIS Express Web Server, if a fully blown install did not exist.

##(2) PHP Mailer

Next this project needed to email form data to an email address, appropriately configuring gmails SMTP settings. 
I found this GitHub site very helpful in explaining the steps required:
       https://github.com/PHPMailer/PHPMailer
       
Here you are instructed to: 
       (1) go into the c:\Program Files(x86)\IIS Express\PHP\v5.3\php.ini file and uncomment the line:
               include_path = ".;c:\php\includes"
       (2) create the directory c:\php\includes
       (3) copy files provided in this GitHub account into the includes directory, reference installation and loading
           where you are directed to the PHPMailer files to download and copy into your includes directory
       (4) follow example on front page of ReadMe file for PHPMailer to configure gmail SMTP settings so you can send   
               emails
       (5) make sure you place line of code at the top of your .php file
               require 'PHPMailerAutoload.php';
          
##(3) How to use Gmail as a Mail Server
I found this website very useful for the SMTP port setting associated with SMTP Security: TLS
       http://docs.joomla.org/How_do_I_use_Gmail_as_my_mail_server%3F

A Simple Example as found on: https://github.com/PHPMailer/PHPMailer

```php
<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'user@example.com';                 // SMTP username
$mail->Password = 'secret';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = 'from@example.com';
$mail->FromName = 'Mailer';
$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
$mail->addAddress('ellen@example.com');               // Name is optional
$mail->addReplyTo('info@example.com', 'Information');
$mail->addCC('cc@example.com');
$mail->addBCC('bcc@example.com');

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

```
