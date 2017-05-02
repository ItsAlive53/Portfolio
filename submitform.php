<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Portfolio</title>

    <link rel="icon" type="image/png" href="favicon.png">

    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/main.css" rel="stylesheet" type="text/css">

    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-98249151-1', 'auto');
      ga('send', 'pageview');

    </script>

    <script src="scripts/jquery-3.2.1.min.js"></script>
    <script src="scripts/tether.min.js"></script>
    <script src="scripts/bootstrap.min.js"></script>
    <script src="scripts/top-scroll-button.js"></script>
  </head>

  <body>
    <button onclick="javascript:toTop();" id="topScrollButton" title="Back to top">
      <i class="fa fa-arrow-up"></i>
    </button>

    <!-- START navbar -->

    <nav class="navbar sticky-top navbar-toggleable-md navbar-inverse bg-inverse">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Navigation Menu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand" href="index.html" onclick="javascript:toTop();">
        <img src="favicon.png" alt="Portfolio" width="30" height="30">
      </a>

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link" href="index.html#showcaseStart">Work</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" href="index.html#cv">CV</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" href="index.html#contactForm">Contact</a>
          </li>

        </ul>
      </div>
    </nav>

    <!-- END navbar -->

    <div class="container-fluid">
      <div class="row" id="submitformbody">

<?php
# firstName, lastName, email, phoneNumber, message
if (isset($_POST['email'])) {
    # temporary
    $email_to = "toni.sojakka@optistud.fi";
    $email_subject = "Email from portfolio form";

    function errorScreen($error) {
        ?>
        <div class="col-12">
          <p>Sorry, but there appears to be a problem with the form you submitted.<br>
          Please return and fix the following errors:<br><br></p>
        </div>
        <div class="col-12">
          <ul><?php echo $error ?></ul>
        </div>

    <?php
        die();
    }

    if (!isset($_POST['firstName']) ||
        !isset($_POST['lastName']) ||
        !isset($_POST['email']) ||
        !isset($_POST['phoneNumber']) ||
        !isset($_POST['message'])) {
      errorScreen("<li>There appears to be a problem with the form data, please try again in a moment.</li>");
    }


    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email_sender = $_POST['email'];
    $phone = $_POST['phoneNumber'];
    $message = $_POST['message'];

    $errMessage = "";
    $emailRegex = "/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";

    if (!preg_match($emailRegex, $email_sender)) {
      $errMessage .= '<li>The Email Address you enter appears to be invalid.</li>';
    }

    $strRegex = "/^[A-Za-z .'-]+$/";

    if (!preg_match($strRegex, $firstName)) {
      $errMessage .= '<li>The First Name you entered appears to be invalid.</li>';
    }

    if (!preg_match($strRegex, $lastName)) {
      $errMessage .= '<li>The Last Name you entered appears to be invalid.</li>';
    }

    $telRegex = "/^[0-9\-]/";

    if (strlen($phone) > 0) {
      if (!preg_match($telRegex, $phone)) {
        $errMessage .= '<li>The Phone number you entered appears to be invalid.</li>';
      }
    }

    if (strlen($message) < 2) {
      $errMessage .= '<li>The Message you entered appears to be invalid.</li>';
    }

    if (strlen($errMessage) > 0) {
      errorScreen($errMessage);
    }

    $email_message = "Sender information:\n\n";

    function cleanStr($str) {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, '', $str);
    }

    $email_message .= "First name: ".cleanStr($firstName)."\n";
    $email_message .= "Last name: ".cleanStr($lastName)."\n";
    $email_message .= "Email: ".cleanStr($email_sender)."\n";
    $email_message .= "Phone: ".cleanStr($phoneNumber)."\n";

    $email_message .= "\n\nMessage:\n\n";
    $email_message .= htmlentities(cleanStr($message));


    $headers = "From: ".$email_sender."\r\n".
    "Reply-To: ".$email_sender."\r\n".
    "Return-Path: ".$email_sender."\r\n".
    "X-Mailer: PHP/".phpversion();
    mail($email_to, $email_subject, $email_message, $headers);
?>

        <p>Email successfully sent, thank you for contacting us.</p>

<?php
}
?>

      </div>
    </div>
  </body>
</html>