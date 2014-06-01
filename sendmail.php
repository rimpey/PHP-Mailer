<?php
    
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();                                // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                 // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                         // Enable SMTP authentication
$mail->Username = 'rhondaimpey@gmail.com';      // SMTP username
$mail->Password = 'xxxxxxxx';                   // SMTP password
$mail->SMTPSecure = 'tls';                      // Enable encryption, 'ssl' also accepted
$mail->Port = 587;

$mail->From = 'noreply@rhondaimpey.com';
$mail->FromName = 'Rhonda Impey';
$mail->addAddress('rhonda_impey@hotmail.co.uk', 'Rhonda Impey');    // Add a recipient
$mail->isHTML(true);                                                // Set email format to HTML
$mail->Subject = 'Website Contact';
$mail->Body    = 'Sender: <b>'.$_POST["fullname"].'</b><br>Company: <b>'.$_POST["company"].'</b><br>Email: <b>'.$_POST["email"].'</b><br>Postcode: <b>'.$_POST["postcode"].'</b><br>Message: <b>'.$_POST["message"].'</b>';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'message sent....';
}
?>
