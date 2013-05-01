<?php

require('Postmark.php');

// Create "server" in "rack", then copy it's API key
define('POSTMARKAPP_API_KEY', 'ce753a2f-3835-49ae-b045-631c95f8fa4d');

//grab email data
$name = $_GET['name'];
$email = $_GET['email'];
$website = $_GET['website'];
$message = $_GET['message'];

define('POSTMARKAPP_MAIL_FROM_ADDRESS', $email);
define('POSTMARKAPP_MAIL_FROM_NAME', $name);

// Create message and send it
Mail_Postmark::compose()
    ->addTo('info@mademediacorp.com', 'Made Media')
    ->subject("Message From: ".$website)
    ->messagePlain($message)
    ->send();

?>