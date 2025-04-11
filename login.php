<?php
// Database connection using PDO
$host = "localhost";
$user = "root";
$password = "";
$database = "lms_database";

try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["success" => false, "message" => "⚠️ ডাটাবেস সংযোগ ব্যর্থ!"]));
}

// ইউজারের ইনপুট নেওয়া এবং স্যানিটাইজ করা
$email = strtolower(trim($_POST['email'])); // সব ইমেইল লোয়ারকেস করা
$password = trim($_POST['password']);

// ✅ ইনপুট যাচাই করা
if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "⚠️ ইমেইল এবং পাসওয়ার্ড দিন!"]);
    exit();
}

// ✅ ইমেইল ফরম্যাট চেক করা
if (!preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)) {
    echo json_encode(["success" => false, "message" => "❌ বৈধ ইমেইল লিখুন!"]);
    exit();
}

try {
    // ✅ ইমেইল অনুযায়ী ইউজার
    $query = "SELECT id, name, email, preferred_course, phone, gender, password FROM users WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    if ($stmt->rowCount() === 1) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // ✅ পাসওয়ার্ড যাচাই করা
        if (password_verify($password, $user['password'])) {
            // সেশন শুরু করা
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_preferredCourse'] = $user['preferred_course'];
            $_SESSION['user_phone'] = $user['phone'];  // ফোন নাম্বার সেশন
            $_SESSION['user_gender'] = $user['gender'];  // লিঙ্গ সেশন

            echo json_encode([
                "success" => true,
                "message" => "✅ লগইন সফল!",
                "user" => [
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "preferredCourse" => $user['preferred_course'],
                    "phone" => $user['phone'],  // ফোন নাম্বার
                    "gender" => $user['gender'] // লিঙ্গ
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "❌ ভুল পাসওয়ার্ড!"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "❌ এই ইমেইলের কোনো ইউজার নেই! রেজিস্ট্রেশন করুন।"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "❌ সার্ভার ত্রুটি, পরে আবার চেষ্টা করুন।"]);
}

// ✅ সংযোগ বন্ধ
$conn = null;
?>
