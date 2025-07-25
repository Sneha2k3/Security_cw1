<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - DigiBanking</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .login-container {
            background: #fff;
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            margin: 40px 0;
        }
        
        .form-control {
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1.2rem;
            border: 1px solid #dbe2ef;
            font-size: 1rem;
            background: #f8f9fa;
        }
        
        .form-control:focus {
            border-color: #3498db;
            box-shadow: 0 0 0 2px #3498db33;
        }
        
        .btn-primary {
            background: linear-gradient(90deg, #1e3c72 0%, #3498db 100%);
            border: none;
            padding: 0.9rem;
            border-radius: 8px;
            width: 100%;
            color: #fff;
            font-weight: 600;
            font-size: 1.1rem;
            transition: background 0.2s;
            margin-top: 0.5rem;
        }
        
        .btn-primary:hover {
            background: linear-gradient(90deg, #3498db 0%, #1e3c72 100%);
        }
        
        .alert {
            border-radius: 8px;
            margin-bottom: 1.2rem;
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="text-center mb-4">
            <i class="fas fa-university fa-3x" style="color:#1e3c72;"></i>
        </div>
        <h2 class="text-center mb-4">DigiBanking Login</h2>
                        <form method="POST" action="">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div class="text-center mt-3">
            <p>Don't have an account? <a href="register.php">Register here</a></p>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 