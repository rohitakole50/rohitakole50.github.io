<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

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
        echo 'error';
    }
} else {
    echo 'Invalid request.';
}
?>
