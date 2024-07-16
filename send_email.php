<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email address where you want to receive the messages
    $to = 'rohit.akole@uconn.edu'; // Replace with your actual email address

    // Email subject
    $subject = 'New Contact Form Submission';

    // Email content
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Email headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // On successful email send, return a success message
        echo 'success';
    } else {
        // On failure, return an error message
        error_log('Email sending failed.');
        echo 'error';
    }
} else {
    error_log('Invalid request method.');
    echo 'Invalid request.';
}
?>
