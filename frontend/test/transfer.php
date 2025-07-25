HTTP/1.1 200 OK
Date: Thu, 24 Jul 2025 09:43:07 GMT
Server: Apache/2.4.62 (Debian)
X-Powered-By: PHP/8.1.32
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate
Pragma: no-cache
Vary: Accept-Encoding
Content-Length: 20612
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transfer Money - DigiBanking</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="static/css/dashboard.css" rel="stylesheet">
    <style>
        .chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .chatbot-button:hover {
            transform: scale(1.1);
            background-color: #2980b9;
        }

        .chatbot-button i {
            font-size: 24px;
        }

        .chatbot-modal {
            display: none;
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }

        .chatbot-header {
            background: var(--primary-color);
            color: white;
            padding: 15px;
            border-radius: 15px 15px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chatbot-body {
            height: calc(100% - 130px);
            overflow-y: auto;
            padding: 15px;
        }

        .chatbot-footer {
            padding: 15px;
            border-top: 1px solid #eee;
        }

        .chat-message {
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
        }

        .chat-message.user {
            align-items: flex-end;
        }

        .chat-message.bot {
            align-items: flex-start;
        }

        .message-bubble {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            margin: 5px 0;
        }

        .user .message-bubble {
            background: var(--secondary-color);
            color: white;
            border-radius: 15px 15px 0 15px;
        }

        .bot .message-bubble {
            background: #f0f2f5;
            color: var(--text-color);
            border-radius: 15px 15px 15px 0;
        }

        .chat-input {
            display: flex;
            gap: 10px;
        }

        .chat-input input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }

        .chat-input button {
            background: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .chat-input button:hover {
            background: #2980b9;
        }
    </style>
</head>
<body> 
<div class="dashboard-container">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 sidebar">
    <div class="profile-header d-flex flex-column align-items-start mb-3">
        <i class="fas fa-user-circle fa-3x text-primary"></i>
        <h4 class="mb-1">dummy test</h4>
        <small class="text-muted">dummy@test.com</small>
    </div>
    
    <ul class="nav flex-column mt-4">
        <li class="nav-item">
            <a class="nav-link " 
               href="dashboard.php">
                <i class="fas fa-home"></i> Dashboard
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="accounts.php">
                <i class="fas fa-wallet"></i> My Accounts
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" 
               href="transfer.php">
                <i class="fas fa-exchange-alt"></i> Transfer
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="cards.php">
                <i class="fas fa-credit-card"></i> Cards
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="electricity.php">
                <i class="fas fa-bolt"></i> Electricity
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="internet.php">
                <i class="fas fa-wifi"></i> Internet
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="mobile.php">
                <i class="fas fa-mobile-alt"></i> Mobile
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="flights.php">
                <i class="fas fa-plane"></i> Flights
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="investments.php">
                <i class="fas fa-chart-line"></i> Investments
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="branches.php">
                <i class="fas fa-building"></i> Branches
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="settings.php">
                <i class="fas fa-cog"></i> Settings
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="qr_pay.php">
                <i class="fas fa-qrcode"></i> QR Pay
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link " 
               href="complaints.php">
                <i class="fas fa-headset"></i> Complaints & Support
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="logout.php">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </li>
    </ul>
</div> 
        <!-- Main Content -->
        <div class="col-md-9 col-lg-10">
            <div class="container-fluid py-4">
                <h2 class="mb-4">Transfer Money</h2>

                                                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle me-2"></i>Source account not found                    </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h5 class="mb-0"><i class="fas fa-exchange-alt me-2"></i>Make a Transfer</h5>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="">
                                    <div class="mb-3">
                                        <label for="from_account" class="form-label">From Account</label>
                                        <select class="form-control" id="from_account" name="from_account" required>
                                            <option value="">Select Account</option>
                                                                                            <option value="6269983845">
                                                    Fixed_deposit - 
                                                    6269983845 
                                                    (Balance: रू0.00)
                                                </option>
                                                                                            <option value="2294586837">
                                                    Savings - 
                                                    2294586837 
                                                    (Balance: रू99,999,690.00)
                                                </option>
                                                                                    </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="to_account" class="form-label">To Account</label>
                                        <input type="text" class="form-control" id="to_account" name="to_account" 
                                               placeholder="Enter recipient account number" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="amount" class="form-label">Amount</label>
                                        <div class="input-group">
                                            <span class="input-group-text">रू</span>
                                            <input type="number" class="form-control" id="amount" name="amount" 
                                                   min="1" step="0.01" required>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="transaction_pin" class="form-label">Transaction PIN</label>
                                        <input type="password" class="form-control" id="transaction_pin" 
                                               name="transaction_pin" maxlength="4" required>
                                    </div>
                                    <button type="submit" name="transfer" class="dashboard-btn dashboard-btn-primary">
                                        <i class="fas fa-exchange-alt me-2"></i>Transfer Money
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="dashboard-card">
                            <div class="card-header">
                                <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Transfer Guidelines</h5>
                            </div>
                            <div class="card-body">
                                <div class="transaction-list">
                                    <div class="transaction-item">
                                        <i class="fas fa-check-circle text-success me-2"></i>
                                        <span>Minimum transfer amount: रू1</span>
                                    </div>
                                    <div class="transaction-item">
                                        <i class="fas fa-check-circle text-success me-2"></i>
                                        <span>Maximum transfer amount: रू10,000 per day</span>
                                    </div>
                                    <div class="transaction-item">
                                        <i class="fas fa-check-circle text-success me-2"></i>
                                        <span>Transfers are processed instantly</span>
                                    </div>
                                    <div class="transaction-item">
                                        <i class="fas fa-check-circle text-success me-2"></i>
                                        <span>Keep your transaction PIN secure</span>
                                    </div>
                                    <div class="transaction-item">
                                        <i class="fas fa-check-circle text-success me-2"></i>
                                        <span>Double-check account numbers before confirming</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <button class="chatbot-button" onclick="toggleChatbot()">
        <i class="fas fa-comments"></i>
    </button>

    <div id="chatbotModal" class="chatbot-modal">
        <div class="chatbot-header">
            <h5 class="mb-0">DigiBanking Assistant</h5>
            <button onclick="toggleChatbot()" class="btn-close btn-close-white"></button>
        </div>
        <div id="chatBody" class="chatbot-body"></div>
        <div class="chatbot-footer">
            <input type="text" id="chatInput" placeholder="Type your message...">
            <button id="sendButton">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="static/js/main.js"></script>
    <script>
        function toggleChatbot() {
            const modal = document.getElementById('chatbotModal');
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'block';
                const chatBody = document.getElementById('chatBody');
                if (chatBody.children.length === 0) {
                    addMessage("Hello! I'm your DigiBanking assistant. How can I help you today?", 'bot');
                    addQuickOptions([
                        'My Account Information',
                        'Bank Services',
                        'Security Settings',
                        'Transaction History',
                        'Help & Support'
                    ]);
                }
            }
        }

        function addMessage(message, sender) {
            const chatBody = document.getElementById('chatBody');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const formattedMessage = message.replace(/\n/g, '<br>');
            messageDiv.innerHTML = formattedMessage;
            
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function addQuickOptions(options) {
            const chatBody = document.getElementById('chatBody');
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quick-options';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'quick-option-btn';
                button.textContent = option;
                button.onclick = () => sendMessage(option);
                optionsDiv.appendChild(button);
            });
            
            chatBody.appendChild(optionsDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function sendMessage(message) {
            if (!message.trim()) return;
            
            addMessage(message, 'user');
            
            const chatBody = document.getElementById('chatBody');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing';
            typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            chatBody.appendChild(typingDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
            
            fetch('chatbot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'message=' + encodeURIComponent(message)
            })
            .then(response => response.json())
            .then(data => {
                chatBody.removeChild(typingDiv);
                
                if (data.text) {
                    addMessage(data.text, 'bot');
                }
                
                if (data.options && data.options.length > 0) {
                    addQuickOptions(data.options);
                }
            })
            .catch(error => {
                chatBody.removeChild(typingDiv);
                
                addMessage("I'm having trouble processing your request. Please try again.", 'bot');
                addQuickOptions(['Help', 'Back to Main Menu']);
            });
        }

        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (message) {
                    sendMessage(message);
                    this.value = '';
                }
            }
        });

        document.getElementById('sendButton').addEventListener('click', function() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            if (message) {
                sendMessage(message);
                input.value = '';
            }
        });
    </script>

    <style>
    .chatbot-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
    }

    .chatbot-modal {
        display: none;
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
    }

    .chatbot-header {
        padding: 15px;
        background: #007bff;
        color: white;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chatbot-body {
        height: 380px;
        overflow-y: auto;
        padding: 15px;
    }

    .chatbot-footer {
        padding: 15px;
        border-top: 1px solid #eee;
        display: flex;
        gap: 10px;
    }

    .message {
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 10px;
        max-width: 80%;
    }

    .user-message {
        background: #007bff;
        color: white;
        margin-left: auto;
    }

    .bot-message {
        background: #f0f0f0;
        color: #333;
    }

    .quick-options {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 10px;
    }

    .quick-option-btn {
        background: #e9ecef;
        border: none;
        border-radius: 15px;
        padding: 5px 10px;
        font-size: 12px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .quick-option-btn:hover {
        background: #dee2e6;
    }

    .typing-indicator {
        display: flex;
        gap: 3px;
        padding: 5px;
    }

    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: #666;
        border-radius: 50%;
        animation: typing 1s infinite;
    }

    .typing-indicator span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    #chatInput {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
    }

    #sendButton {
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #sendButton:hover {
        background: #0056b3;
    }
    </style>
</body>
</html>  