<?php
// ডাটাবেস সংযোগ (PDO ব্যবহার)
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

// ফর্ম ডাটা গ্রহণ করা এবং স্যানিটাইজ করা
$name = trim($_POST['name']);
$email = strtolower(trim($_POST['email'])); // সব ইমেইল লোয়ারকেস করা
$phone = trim($_POST['phone']);
$date_of_birth = trim($_POST['dob']);
$gender = $_POST['gender'];
$preferredCourse = trim($_POST['preferredCourse']);
$password = trim($_POST['password']);
$confirmPassword = trim($_POST['confirm-password']);

// ✅ ইনপুট যাচাই করা
if (empty($name) || empty($email) || empty($phone) || empty($date_of_birth) || empty($preferredCourse) || empty($password) || empty($confirmPassword)) {
    echo json_encode(["success" => false, "message" => "⚠️ সবগুলো তথ্য পূরণ করুন!"]);
    exit();
}

// ✅ পাসওয়ার্ড মিল যাচাই করা
if ($password !== $confirmPassword) {
    echo json_encode(["success" => false, "message" => "❌ পাসওয়ার্ড মেলেনি!"]);
    exit();
}

// ✅ ইমেইল ফরম্যাট চেক করা
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "❌ বৈধ ইমেইল লিখুন!"]);
    exit();
}

// ✅ পাসওয়ার্ড নীতি যাচাই
if (strlen($password) < 8 || !preg_match("/[A-Z]/", $password) || !preg_match("/[a-z]/", $password) || !preg_match("/[0-9]/", $password) || !preg_match("/[\W]/", $password)) {
    echo json_encode(["success" => false, "message" => "🔑 পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে এবং অবশ্যই বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা ও একটি বিশেষ চিহ্ন থাকতে হবে!"]);
    exit();
}

// ✅ ফোন নম্বর যাচাই (বেসিক ফরম্যাট চেক)
if (!preg_match("/^\+?[0-9]{10,15}$/", $phone)) {
    echo json_encode(["success" => false, "message" => "❌ সঠিক ফোন নম্বর দিন!"]);
    exit();
}

// ✅ জন্ম তারিখ যাচাই
if (!strtotime($date_of_birth)) {
    echo json_encode(["success" => false, "message" => "❌ সঠিক জন্ম তারিখ দিন!"]);
    exit();
}

// ✅ পাসওয়ার্ড এনক্রিপশন
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// ✅ ইমেইল ডুপ্লিকেট চেক করা
$checkQuery = "SELECT id FROM users WHERE email = :email";
$stmt = $conn->prepare($checkQuery);
$stmt->bindParam(':email', $email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "⚠️ এই ইমেইলটি ইতিমধ্যে নিবন্ধিত!"]);
    exit();
}

// ✅ নতুন ইউজার ইনসার্ট করা
$query = "INSERT INTO users (name, email, phone, date_of_birth, gender, preferred_course, password) 
          VALUES (:name, :email, :phone, :date_of_birth, :gender, :preferredCourse, :password)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':phone', $phone);
$stmt->bindParam(':date_of_birth', $date_of_birth);  // এখানে date_of_birth সঠিকভাবে ইনসার্ট হবে
$stmt->bindParam(':gender', $gender);
$stmt->bindParam(':preferredCourse', $preferredCourse);
$stmt->bindParam(':password', $hashedPassword);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "✅ নিবন্ধন সফল!",
        "redirectUrl" => "login.php"  // লগইন পেজে রিডিরেক্ট করার URL
    ]);
} else {
    echo json_encode(["success" => false, "message" => "❌ নিবন্ধন ব্যর্থ হয়েছে!"]);
}

