// Login page specific functions

// Login page variables
let currentLoginMethod = '';
let currentLoginValue = '';
let isSignupFlow = false;
let signupStep = 0; // 0: initial, 1: name/IC, 2: secondary contact, 3: complete
let primaryContactVerified = false;
let signupData = {};

// Login page functions
function setupLoginPage() {
    // Setup email login form
    document.getElementById('emailLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        requestOTP('email', email, false); // false = not signup
    });
    
    // Setup phone login form
    document.getElementById('phoneLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('phoneNumber').value;
        requestOTP('phone', phone, false); // false = not signup
    });
    
    // Setup email signup form
    document.getElementById('emailSignup').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        requestOTP('email', email, true); // true = signup
    });
    
    // Setup phone signup form
    document.getElementById('phoneSignup').addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('signupPhone').value;
        requestOTP('phone', phone, true); // true = signup
    });
    
    // Setup name and IC form
    document.getElementById('nameICForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleNameICSubmission();
    });
    
    // Setup secondary contact form
    document.getElementById('secondaryContactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        requestSecondaryOTP();
    });
    
    // Setup OTP verification form
    document.getElementById('otpVerification').addEventListener('submit', function(e) {
        e.preventDefault();
        verifyOTP();
    });
    
    // Setup OTP input auto-focus
    setupOTPInputs();
}

function showLoginMethod(method) {
    currentLoginMethod = method;
    isSignupFlow = false;
    
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show selected form
    if (method === 'email') {
        document.getElementById('emailLoginForm').style.display = 'block';
    } else if (method === 'phone') {
        document.getElementById('phoneLoginForm').style.display = 'block';
    }
}

function showSignupMethodSelection() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'block';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
}

function showSignupMethod(method) {
    currentLoginMethod = method;
    isSignupFlow = true;
    signupStep = 0;
    primaryContactVerified = false;
    signupData = {};
    
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show selected form
    if (method === 'email') {
        document.getElementById('emailSignupForm').style.display = 'block';
    } else if (method === 'phone') {
        document.getElementById('phoneSignupForm').style.display = 'block';
    }
}

function showLoginMethodSelection() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'block';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
}

function requestOTP(method, value, isSignup) {
    currentLoginValue = value;
    isSignupFlow = isSignup;
    
    // Simulate OTP request (in real app, this would call backend)
    const action = isSignup ? 'Sign up' : 'Login';
    showNotification(`${action} OTP sent to your ${method}`, 'success');
    
    if (isSignup) {
        // For signup, show OTP form directly for initial contact verification
        showOTPForm(method, value);
    } else {
        // For login, show OTP form directly
        showOTPForm(method, value);
    }
}

function showOTPForm(method, value) {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    
    // Show OTP form
    document.getElementById('otpForm').style.display = 'block';
    
    // Update OTP target text
    document.getElementById('otpTarget').textContent = method === 'email' ? `email: ${value}` : `phone: ${value}`;
    
    // Clear OTP inputs
    document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
    document.querySelector('.otp-digit').focus();
}

function showNameICForm() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    document.getElementById('secondaryContactForm').style.display = 'none';
    
    // Show name/IC form
    document.getElementById('signupBasicInfoForm').style.display = 'block';
    
    // Pre-fill verified contact info
    document.getElementById('verifiedContactInfo').value = currentLoginMethod === 'email' ? 
        `Email: ${currentLoginValue}` : `Phone: ${currentLoginValue}`;
}

function handleNameICSubmission() {
    const fullName = document.getElementById('signupFullName').value;
    const icNumber = document.getElementById('signupICNumber').value;
    
    // Store signup data with consistent keys
    signupData.name = fullName;
    signupData.icNumber = icNumber;
    
    // Store primary contact with consistent keys
    if (currentLoginMethod === 'email') {
        signupData.email = currentLoginValue;
    } else if (currentLoginMethod === 'phone') {
        signupData.phone = currentLoginValue;
    }
    
    // Debug: Check data after name/IC submission
    console.log('After name/IC submission:', signupData);
    
    // Show secondary contact form
    showSecondaryContactForm();
}

function showSecondaryContactForm() {
    // Hide all forms
    document.getElementById('loginMethodSelection').style.display = 'none';
    document.getElementById('signupMethodSelection').style.display = 'none';
    document.getElementById('emailLoginForm').style.display = 'none';
    document.getElementById('phoneLoginForm').style.display = 'none';
    document.getElementById('emailSignupForm').style.display = 'none';
    document.getElementById('phoneSignupForm').style.display = 'none';
    document.getElementById('signupBasicInfoForm').style.display = 'none';
    document.getElementById('otpForm').style.display = 'none';
    
    // Show secondary contact form
    document.getElementById('secondaryContactForm').style.display = 'block';
    
    // Set up secondary contact prompt and label
    if (currentLoginMethod === 'email') {
        document.getElementById('secondaryContactPrompt').textContent = 'Please provide your phone number';
        document.getElementById('secondaryContactLabel').textContent = 'Phone Number';
        document.getElementById('secondaryContact').placeholder = '+60 12-3456789';
        document.getElementById('secondaryContact').type = 'tel';
    } else {
        document.getElementById('secondaryContactPrompt').textContent = 'Please provide your email address';
        document.getElementById('secondaryContactLabel').textContent = 'Email Address';
        document.getElementById('secondaryContact').placeholder = 'Enter your email address';
        document.getElementById('secondaryContact').type = 'email';
    }
}

function goBackToNameIC() {
    showNameICForm();
}

function requestSecondaryOTP() {
    const secondaryContact = document.getElementById('secondaryContact').value;
    const secondaryMethod = currentLoginMethod === 'email' ? 'phone' : 'email';
    
    // Store secondary contact with consistent keys
    if (secondaryMethod === 'email') {
        signupData.email = secondaryContact;
    } else if (secondaryMethod === 'phone') {
        signupData.phone = secondaryContact;
    }
    
    // Debug: Check data after secondary contact
    console.log('After secondary contact:', signupData);
    
    // Request OTP for secondary contact
    showNotification(`OTP sent to your ${secondaryMethod}`, 'success');
    showOTPForm(secondaryMethod, secondaryContact);
}

function setupOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            // Handle backspace
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').slice(0, 6);
            const digits = pastedData.replace(/[^0-9]/g, '');
            
            digits.split('').forEach((digit, i) => {
                if (i < otpInputs.length) {
                    otpInputs[i].value = digit;
                }
            });
            
            // Focus on the next empty input or the last one
            const nextEmpty = Array.from(otpInputs).findIndex(input => !input.value);
            if (nextEmpty !== -1) {
                otpInputs[nextEmpty].focus();
            } else {
                otpInputs[otpInputs.length - 1].focus();
            }
        });
    });
}

function verifyOTP() {
    const otpInputs = document.querySelectorAll('.otp-digit');
    const otpCode = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otpCode.length !== 6) {
        showNotification('Please enter all 6 digits', 'warning');
        return;
    }
    
    // Simulate OTP verification (in real app, this would verify with backend)
    if (otpCode === '123456') { // Demo OTP
        if (isSignupFlow) {
            if (!primaryContactVerified) {
                // First OTP verification - primary contact verified
                primaryContactVerified = true;
                showNotification('Primary contact verified! Please provide your basic information.', 'success');
                setTimeout(() => {
                    showNameICForm();
                }, 1000);
            } else {
                // Second OTP verification - secondary contact verified, signup complete
                showNotification('Sign up successful!', 'success');
                
                // Debug: Check signup data before storing
                console.log('Storing signup data:', signupData);
                
                // Store complete signup data
                sessionStorage.setItem('signupData', JSON.stringify(signupData));
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('loginMethod', currentLoginMethod);
                sessionStorage.setItem('loginValue', currentLoginValue);
                sessionStorage.removeItem('isGuest'); // Clear guest flag
                
                // Debug: Verify it was stored
                console.log('Stored signupData:', sessionStorage.getItem('signupData'));
                
                // Navigate to customer info page
                setTimeout(() => {
                    navigateToPage('customer-info.html');
                }, 1000);
            }
        } else {
            // Login flow
            showNotification('Login successful!', 'success');
            
            // Store login data
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('loginMethod', currentLoginMethod);
            sessionStorage.setItem('loginValue', currentLoginValue);
            sessionStorage.removeItem('isGuest'); // Clear guest flag
            
            // Navigate to customer info page
            setTimeout(() => {
                navigateToPage('customer-info.html');
            }, 1000);
        }
    } else {
        showNotification('Invalid OTP. Please try again.', 'danger');
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        document.querySelector('.otp-digit').focus();
    }
}

function proceedAsGuest() {
    // Set guest mode
    sessionStorage.setItem('isGuest', 'true');
    sessionStorage.setItem('isLoggedIn', 'false');
    
    showNotification('Continuing as guest', 'info');
    
    // Navigate directly to customer info page
    setTimeout(() => {
        navigateToPage('customer-info.html');
    }, 1000);
}

function resendOTP() {
    if (currentLoginValue) {
        showNotification('OTP resent successfully!', 'info');
        // Clear OTP inputs and focus first one
        document.querySelectorAll('.otp-digit').forEach(input => input.value = '');
        document.querySelector('.otp-digit').focus();
    }
}

// Login page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    if (window.location.pathname.includes('login.html')) {
        setupLoginPage();
    }
});
