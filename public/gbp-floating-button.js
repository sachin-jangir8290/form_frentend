// GBP Floating Button Script
// Include this script on your website to add a floating button that opens the complete form

(function() {
    console.log('GBP Floating Button script loaded successfully!');

    // Wait for DOM to be ready
    function initGBPButton() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createGBPButton);
        } else {
            createGBPButton();
        }
    }

    function createGBPButton() {
        console.log('Creating GBP Button...');

        // Configuration
        const config = {
            useEmbeddedForm: true, // Set to false to use iframe with external URL
            formUrl: 'http://localhost:5173/embeddable-full-form.html', // Fallback URL for iframe
            position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
            size: 80, // Button size in pixels
            tooltipText: 'Hi! Click me to check your GBP status! 🤖'
        };

        console.log('GBP Button config:', config);

        // Embedded form HTML and CSS
        const embeddedFormCSS = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .gbp-modal-body {
                height: calc(100% - 80px);
                overflow-y: auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .form-container {
                background: white;
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                max-width: 800px;
                width: 100%;
                margin: 0 auto;
            }

            .form-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .form-header h1 {
                color: #2c3e50;
                font-size: 2.2em;
                margin-bottom: 10px;
            }

            .form-header p {
                color: #666;
                font-size: 1em;
            }

            .form-section {
                margin-bottom: 30px;
                padding: 25px;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #4facfe;
            }

            .form-section legend {
                font-weight: 700;
                font-size: 1.4em;
                margin-bottom: 15px;
                color: #2c3e50;
                padding: 0 10px;
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .option-group {
                margin-bottom: 20px;
            }

            .option-group b {
                font-size: 16px;
                margin-bottom: 10px;
                display: block;
                color: #2c3e50;
            }

            .option-group label {
                display: flex;
                align-items: center;
                padding: 8px 0;
                gap: 10px;
                cursor: pointer;
            }

            .option-group input[type="radio"],
            .option-group input[type="checkbox"] {
                margin: 0;
                accent-color: #4facfe;
                cursor: pointer;
                flex-shrink: 0;
            }

            .input-group {
                position: relative;
                margin-bottom: 20px;
            }

            .input-group input {
                width: 100%;
                padding: 14px 16px;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                font-size: 16px;
                transition: all 0.3s ease;
                background: #fff;
            }

            .input-group input:focus {
                outline: none;
                border-color: #4facfe;
                box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
            }

            .input-group label {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                font-weight: 600;
                color: #4facfe;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                pointer-events: none;
                transition: all 0.3s ease;
                z-index: 1;
            }

            .input-group input:focus + label,
            .input-group input:not(:placeholder-shown) + label {
                top: -8px;
                font-size: 11px;
            }

            .generate-report-btn {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: #fff;
                border: none;
                border-radius: 10px;
                padding: 16px 35px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin: 15px 0;
                box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
                width: 100%;
            }

            .generate-report-btn:hover:not(.disabled-btn) {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
            }

            .generate-report-btn.disabled-btn {
                background: linear-gradient(135deg, #adb5bd 0%, #6c757d 100%);
                cursor: not-allowed;
                transform: none;
                box-shadow: none;
                opacity: 0.6;
            }

            .report-display-section {
                margin-top: 35px;
                padding: 25px;
                background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                border-radius: 12px;
                border: 1px solid #e9ecef;
                box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            }

            .contact-fields {
                margin: 25px 0;
                background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
                padding: 25px;
                border-radius: 12px;
                border: 1px solid #e9ecef;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            }

            .contact-fields h3 {
                margin-top: 0;
                margin-bottom: 20px;
                color: #2c3e50;
                font-size: 1.4em;
                font-weight: 600;
            }

            .contact-fields p {
                color: #666;
                margin-bottom: 20px;
                font-size: 0.9em;
            }

            .submit-btn {
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: all 0.3s ease;
                margin-top: 20px;
            }

            .submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
            }

            .success-message {
                background: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-top: 20px;
                display: none;
            }

            .error-message {
                background: #f8d7da;
                color: #721c24;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                margin-top: 20px;
                display: none;
            }

            .disclaimer-section {
                background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
                border: 2px solid #ffc107;
                border-radius: 12px;
                margin-bottom: 25px;
            }

            .disclaimer-content {
                padding: 20px;
            }

            .disclaimer-text {
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
                border: 1px solid #dee2e6;
            }

            .disclaimer-text p {
                margin: 12px 0;
                line-height: 1.6;
                color: #495057;
            }

            .disclaimer-text strong {
                color: #dc3545;
            }

            .disclaimer-checkbox {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                border: 2px solid #dee2e6;
            }

            .disclaimer-checkbox label {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                font-weight: 600;
                color: #495057;
                cursor: pointer;
                line-height: 1.5;
            }

            .disclaimer-checkbox input[type="checkbox"] {
                margin-top: 2px;
                width: 18px;
                height: 18px;
                accent-color: #28a745;
                flex-shrink: 0;
            }

            .disabled-section {
                opacity: 0.4;
                pointer-events: none;
                filter: grayscale(100%);
            }

            .conditional-question {
                margin-top: 15px;
                padding: 15px;
                border-left: 4px solid #4CAF50;
                background-color: #f9fdf9;
                animation: fadeIn 0.5s ease-in-out;
                border-radius: 0 8px 8px 0;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .form-container {
                    padding: 20px;
                    margin: 10px;
                }

                .form-header h1 {
                    font-size: 1.8em;
                }

                .form-section {
                    padding: 15px;
                }

                .option-group b {
                    font-size: 14px;
                }
            }
        `;

        const embeddedFormHTML = `
            <div class="form-container">
                <div class="form-header">
                    <h1>GBP Suspension Checker</h1>
                    <p>Complete assessment to check your Google Business Profile status</p>
                </div>

                <form id="suspension-form">
                    <!-- Disclaimer Section -->
                    <div class="form-section disclaimer-section">
                        <fieldset>
                            <legend>⚠️ Important Notice</legend>
                            <div class="disclaimer-content">
                                <div class="disclaimer-text">
                                    <p><strong>This form is intended solely to assist users with collecting information related to Google My Business (GMB).</strong></p>
                                    <p><strong>We are not affiliated with Google or any of its services.</strong></p>
                                    <p><strong>The content submitted through this form is not reviewed or verified by Google.</strong></p>
                                    <p>Please ensure you have read and understood Google's official guidelines before proceeding.</p>
                                    <p>By submitting this form, you acknowledge that you are responsible for complying with Google's policies and that this tool is offered for informational purposes only.</p>
                                </div>
                                <div class="disclaimer-checkbox">
                                    <label>
                                        <input type="checkbox" id="disclaimer-accept" required>
                                        I have read and understood the above notice and agree to proceed
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 1: Business Type & Location -->
                    <div class="form-section" id="section-1">
                        <fieldset>
                            <legend>1. Business Type & Location</legend>
                            <div class="option-group">
                                <b>Q1. What type of business do you operate?</b>
                                <label><input type="radio" name="business-type" value="Brick-and-mortar store" required> Brick-and-mortar store</label>
                                <label><input type="radio" name="business-type" value="Home-based business"> Home-based business</label>
                                <label><input type="radio" name="business-type" value="Mobile or service-area business"> Mobile or service-area business</label>
                                <label><input type="radio" name="business-type" value="Online-only business"> Online-only business</label>
                            </div>
                            <div class="option-group">
                                <b>Q2. Do you operate from a:</b>
                                <label><input type="checkbox" name="location-type-1"> Private office</label>
                                <label><input type="checkbox" name="location-type-2"> Shared workspace</label>
                                <label><input type="checkbox" name="location-type-3"> Virtual office</label>
                                <label><input type="checkbox" name="location-type-4"> P.O. Box or mailbox center</label>
                                <label><input type="checkbox" name="location-type-5"> Residential address</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 2: Recent Changes -->
                    <div class="form-section" id="section-2">
                        <fieldset>
                            <legend>2. Recent Changes</legend>
                            <div class="option-group">
                                <b>Q3. Have you made any changes to your GBP recently? (Select all that apply)</b>
                                <label><input type="checkbox" name="recently-changes"> Business name</label>
                                <label><input type="checkbox" name="recently-changes-1"> Business category</label>
                                <label><input type="checkbox" name="recently-changes-2"> Address</label>
                                <label><input type="checkbox" name="recently-changes-3"> Phone number</label>
                                <label><input type="checkbox" name="recently-changes-4"> Website</label>
                                <label><input type="checkbox" name="recently-changes-5"> Added new photos or videos</label>
                                <label><input type="checkbox" name="recently-changes-6"> No changes made recently</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 3: Contact Information Details -->
                    <div class="form-section" id="section-3">
                        <fieldset>
                            <legend>3. Contact Information Details</legend>
                            <div class="option-group">
                                <b>Q4. Are you using a phone number or address that's shared with another business?</b>
                                <label><input type="radio" name="shared-contact" value="Yes"> Yes</label>
                                <label><input type="radio" name="shared-contact" value="No"> No</label>
                                <label><input type="radio" name="shared-contact" value="Not sure"> Not sure</label>
                            </div>
                            <div class="option-group">
                                <b>Q5. Is your listed phone number a mobile or landline?</b>
                                <label><input type="radio" name="phone-type" value="Mobile"> Mobile</label>
                                <label><input type="radio" name="phone-type" value="Landline (business)"> Landline (business)</label>
                                <label><input type="radio" name="phone-type" value="VoIP or call-forwarding service"> VoIP or call-forwarding service</label>
                                <label><input type="radio" name="phone-type" value="Not sure"> Not sure</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 4: Verification & Access -->
                    <div class="form-section" id="section-4">
                        <fieldset>
                            <legend>4. Verification & Access</legend>
                            <div class="option-group">
                                <b>Q6. How was your GBP verified?</b>
                                <label><input type="radio" name="verification" value="Postcard"> Postcard</label>
                                <label><input type="radio" name="verification" value="Phone"> Phone</label>
                                <label><input type="radio" name="verification" value="Video verification"> Video verification</label>
                                <label><input type="radio" name="verification" value="Third-party agency"> Third-party agency</label>
                                <label><input type="radio" name="verification" value="Dont remember"> Don't remember</label>
                            </div>
                            <div class="option-group">
                                <b>Q7. Do you have access to the Google Account that manages the GBP?</b>
                                <label><input type="radio" name="account-access" value="Yes"> Yes</label>
                                <label><input type="radio" name="account-access" value="No"> No</label>
                                <label><input type="radio" name="account-access" value="Its managed by an agency or someone else"> It's managed by an agency or someone else</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 5: Compliance & Authenticity -->
                    <div class="form-section" id="section-5">
                        <fieldset>
                            <legend>5. Compliance & Authenticity</legend>
                            <div class="option-group">
                                <b>Q8. Does your business have clear signage at the location?</b>
                                <label><input type="radio" name="signage" value="Yes, permanently visible signage"> Yes, permanently visible signage</label>
                                <label><input type="radio" name="signage" value="No signage yet"> No signage yet</label>
                                <label><input type="radio" name="signage" value="Not applicable (service-area business)"> Not applicable (service-area business)</label>
                            </div>
                            <div class="option-group" id="staffed-questions" style="display: none;">
                                <b>Q9. Is your business staffed and open during listed business hours?</b>
                                <label><input type="radio" name="staffed" value="Yes"> Yes</label>
                                <label><input type="radio" name="staffed" value="No"> No</label>
                                <label><input type="radio" name="staffed" value="Sometimes / on-demand"> Sometimes / on-demand</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 6: Photos, Content, and Reviews -->
                    <div class="form-section" id="section-6">
                        <fieldset>
                            <legend>6. Photos, Content, and Reviews</legend>
                            <div class="option-group">
                                <b>Q10. Have you uploaded stock images, logos with text overlays, or generic promotional content?</b>
                                <label><input type="radio" name="stock-images" value="Yes"> Yes</label>
                                <label><input type="radio" name="stock-images" value="No"> No</label>
                                <label><input type="radio" name="stock-images" value="Not sure"> Not sure</label>
                            </div>
                            <div class="option-group">
                                <b>Q11. Have you received multiple suspicious or fake reviews recently?</b>
                                <label><input type="radio" name="fake-reviews" value="Yes"> Yes</label>
                                <label><input type="radio" name="fake-reviews" value="No"> No</label>
                                <label><input type="radio" name="fake-reviews" value="Not sure"> Not sure</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Section 7: Google Communication -->
                    <div class="form-section" id="section-7">
                        <fieldset>
                            <legend>7. Google Communication</legend>
                            <div class="option-group">
                                <b>Q12. Did you receive any emails from Google before or after suspension?</b>
                                <label><input type="checkbox" name="google-emails-1"> Yes, warning before suspension</label>
                                <label><input type="checkbox" name="google-emails-2"> Yes, notice after suspension</label>
                                <label><input type="checkbox" name="google-emails-3"> No emails received</label>
                                <label><input type="checkbox" name="google-emails-4"> Not sure</label>
                            </div>
                        </fieldset>
                    </div>

                    <!-- Generate Report Button -->
                    <button type="button" class="generate-report-btn" id="generate-report-btn" disabled>
                        📊 Generate Report
                    </button>

                    <!-- Report Display -->
                    <div id="report-section" style="display: none;">
                        <div class="report-display-section">
                            <div id="report-content"></div>

                            <!-- Contact Information Section -->
                            <div class="contact-fields">
                                <h3>📧 Your Contact Information</h3>
                                <p>Please provide your details to receive the detailed report via email.</p>

                                <div class="input-group">
                                    <input type="text" id="business-name" name="business_name" placeholder=" " required>
                                    <label for="business-name">Business Name</label>
                                </div>

                                <div class="input-group">
                                    <input type="email" id="user-email" name="email" placeholder=" " required>
                                    <label for="user-email">Email Address</label>
                                </div>

                                <div class="input-group">
                                    <input type="tel" id="user-phone" name="phone" placeholder=" " required>
                                    <label for="user-phone">Phone Number</label>
                                </div>

                                <div class="input-group">
                                    <input type="url" id="gmb-url" name="gmb_url" placeholder="https://maps.google.com/...">
                                    <label for="gmb-url">GMB URL (Optional)</label>
                                </div>
                            </div>

                            <button type="submit" class="submit-btn">📤 Submit Report</button>
                        </div>
                    </div>

                    <div id="success-message" class="success-message">
                        ✅ Success! Your report has been sent to your email.
                    </div>

                    <div id="error-message" class="error-message">
                        ❌ Error submitting form. Please try again.
                    </div>
                </form>
            </div>
        `;

        // Read positioning attributes from script tag
        const scripts = document.getElementsByTagName('script');
        const currentScript = scripts[scripts.length - 1]; // This script should be the last loaded
        const scriptTop = currentScript.getAttribute('top');
        const scriptLeft = currentScript.getAttribute('left');
        const scriptBottom = currentScript.getAttribute('bottom');
        const scriptRight = currentScript.getAttribute('right');

        console.log('Script positioning attributes:', { scriptTop, scriptLeft, scriptBottom, scriptRight });

    // Create styles
    const styles = `
        .gbp-floating-btn {
            position: fixed;
            /* Positioning will be set via inline styles */
            width: ${config.size}px;
            height: ${config.size}px;
            border-radius: 50%;
            background: rgb(3, 0, 0);
            cursor: pointer;
            z-index: 10;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .gbp-floating-btn:hover {
            transform: scale(1.05);
        }

        .gbp-floating-btn svg {
            width: ${config.size * 0.75}px;
            height: ${config.size * 0.75}px;
            margin-top: ${config.size * 0.25}px;
            transition: all 0.3s ease;
            animation: gbpFloat 3s ease-in-out infinite;
        }

        .gbp-floating-btn:hover svg {
            width: ${config.size * 0.8}px;
            animation: gbpDance 1s ease-in-out infinite;
        }

        @keyframes gbpFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-3px) rotate(1deg); }
            50% { transform: translateY(-6px) rotate(0deg); }
            75% { transform: translateY(-3px) rotate(-1deg); }
        }

        @keyframes gbpDance {
            0%, 100% { transform: scale(1.08) rotate(0deg); }
            25% { transform: scale(1.08) rotate(5deg); }
            50% { transform: scale(1.08) rotate(0deg); }
            75% { transform: scale(1.08) rotate(-5deg); }
        }

        .gbp-floating-btn::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            background: rgba(79, 172, 254, 0.3);
            animation: gbpPulse 2s ease-in-out infinite;
            z-index: -1;
        }

        @keyframes gbpPulse {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.3; }
        }

        .gbp-tooltip {
            position: absolute;
            /* Positioning will be set via inline styles */
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 11;
            pointer-events: none;
        }

        .gbp-tooltip.show {
            opacity: 1;
            visibility: visible;
        }

        .gbp-tooltip::after {
            content: '';
            position: absolute;
            /* Positioning will be set via inline styles */
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            /* Arrow direction will be set via inline styles */
        }

        .gbp-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10002;
            backdrop-filter: blur(5px);
        }

        .gbp-modal.show {
            display: flex;
        }

        .gbp-modal-content {
            background: white;
            border-radius: 15px;
            width: 90%;
            max-width: 900px;
            height: 90%;
            max-height: 700px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            overflow: hidden;
            animation: gbpModalSlideIn 0.3s ease-out;
        }

        @keyframes gbpModalSlideIn {
            from { opacity: 0; transform: scale(0.9) translateY(-20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .gbp-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }

        .gbp-modal-header h2 {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }

        .gbp-modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .gbp-modal-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        .gbp-modal-body {
            height: calc(100% - 80px);
            overflow: hidden;
        }

        .gbp-modal-body iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        @media (max-width: 768px) {
            .gbp-floating-btn {
                width: 70px;
                height: 70px;
            }

            .gbp-floating-btn svg {
                width: 50px;
            }

            .gbp-floating-btn:hover svg {
                width: 55px;
            }
        }
    `;

    // Robot SVG
    const robotSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 411 512.455">
            <path fill="#213853" fillRule="nonzero" d="M372.051 147.174c10.205 1 19.394 5.584 26.275 12.467 7.82 7.818 12.674 18.613 12.674 30.497v40.881c0 11.883-4.854 22.678-12.674 30.497-6.871 6.872-16.042 11.453-26.228 12.463-2.76 35.268-32.451 63.241-68.401 63.241H248.96v17.858c7.963 2.394 13.813 9.792 13.861 18.485h25.01c43.316 0 78.72 35.404 78.72 78.72v49.752c0 5.755-4.665 10.42-10.419 10.42H57.101c-5.754 0-10.419-4.665-10.419-10.42v-49.752c0-43.316 35.404-78.72 78.72-78.72h24.063c.048-8.668 5.917-16.076 13.861-18.479V337.22h-54.737c-35.914 0-65.579-27.915-68.391-63.133-10.704-.735-20.363-5.408-27.524-12.571C4.854 253.697 0 242.902 0 231.019v-40.881c0-11.884 4.854-22.679 12.674-30.497 7.171-7.173 16.847-11.85 27.571-12.574 3.063-34.97 32.609-62.609 68.344-62.609h87.316V61.51a31.659 31.659 0 01-11.948-7.508c-5.724-5.725-9.266-13.635-9.266-22.368 0-8.734 3.542-16.643 9.266-22.368C189.682 3.542 197.592 0 206.324 0c8.733 0 16.643 3.542 22.367 9.267 5.725 5.723 9.267 13.632 9.267 22.367 0 8.733-3.542 16.643-9.267 22.367a31.649 31.649 0 01-11.948 7.509v22.948h86.954c35.772 0 65.342 27.695 68.354 62.716z"/>
            <path fill="#495F7C" d="M238.541 337.22v17.044h-64.797V337.22z"/>
            <path fill="#DD786D" d="M39.977 263.614c-16.53-1.618-29.558-15.658-29.558-32.595v-40.881c0-16.937 13.028-30.977 29.558-32.595v106.071z"/>
            <path fill="#EE9983" d="M39.977 250.267c-16.53-1.618-29.558-15.659-29.558-32.596v-27.533c0-16.937 13.028-30.976 29.558-32.595v92.724z"/>
            <path fill="#DD786D" d="M372.309 263.462c15.914-2.202 28.272-15.948 28.272-32.443v-40.881c0-16.495-12.358-30.241-28.272-32.443v105.767z"/>
            <path fill="#EE9983" d="M372.309 250.115c15.914-2.202 28.272-15.948 28.272-32.444v-27.533c0-16.495-12.358-30.241-28.272-32.442v92.419z"/>
            <path fill="#DFDCDF" d="M108.589 94.937h195.108c31.974 0 58.133 26.159 58.133 58.132v115.54c0 31.973-26.159 58.132-58.133 58.132H108.589c-31.974 0-58.133-26.159-58.133-58.132v-115.54c0-31.973 26.159-58.132 58.133-58.132z"/>
            <path fill="#F9F2F5" d="M104.421 94.937h182.605c31.972 0 58.133 26.168 58.133 58.132v115.54c0 16.042-6.594 30.633-17.203 41.18a57.64 57.64 0 01-21.377 4.096H123.974c-31.965 0-58.133-26.16-58.133-58.132v-115.54c0-25.373 11.859-45.276 38.58-45.276z"/>
            <path fill="#F0AB9E" d="M206.325 10.419c11.716 0 21.214 9.498 21.214 21.215s-9.498 21.214-21.214 21.214c-11.717 0-21.215-9.497-21.215-21.214 0-11.717 9.498-21.215 21.215-21.215z"/>
            <path fill="#EA8D7A" d="M227.501 32.89c-.65 11.133-9.881 19.959-21.177 19.959-9.487 0-17.519-6.228-20.232-14.819.651-11.132 9.882-19.958 21.176-19.958 9.488 0 17.52 6.228 20.233 14.818z"/>
            <path fill="#FAF4F4" d="M168.871 364.682h74.543c4.908 0 8.929 3.986 8.988 8.881h-92.518c.058-4.895 4.08-8.881 8.987-8.881z"/>
            <path fill="#F2EBEC" d="M132.26 383.982h148.364c.225.416.526.8.901 1.132 4.08 3.602 7.715 7.879 10.912 12.302 3.222 4.459 6.025 9.122 8.403 13.424 4.133 7.479 6.384 13.587 7.591 19.801 1.22 6.285 1.412 12.9 1.412 21.225v49.998c0 .058.001.115.004.172h-206.81c.002-.057.004-.114.004-.172v-49.998c0-8.325.192-14.94 1.412-21.225 1.207-6.214 3.457-12.322 7.591-19.801 2.378-4.302 5.182-8.965 8.404-13.424 3.197-4.423 6.831-8.7 10.912-12.302a4.14 4.14 0 00.9-1.132zm160.087.154c35.481 2.346 63.785 32.099 63.785 68.147v20.154a4.002 4.002 0 00-.219-.006h-37.734v-20.565c0-8.754-.215-15.773-1.576-22.787-1.376-7.086-3.89-13.956-8.47-22.243-2.486-4.499-5.457-9.429-8.956-14.272-2.093-2.896-4.367-5.744-6.83-8.428zm63.785 96.626v21.274h-37.957c.002-.057.004-.114.004-.172v-21.097h37.734c.073 0 .146-.002.219-.005zM94.709 502.036H57.101v-21.273c.062.003.124.004.187.004h37.417v21.097c0 .058.002.115.004.172zm-.004-29.605H57.288c-.063 0-.125.002-.187.004v-20.152c0-35.923 28.106-65.596 63.414-68.123-2.454 2.676-4.72 5.517-6.807 8.404-3.499 4.842-6.47 9.772-8.957 14.272-4.58 8.288-7.094 15.157-8.47 22.243-1.362 7.014-1.576 14.033-1.576 22.787v20.565z"/>
            <path fill="#233551" fillRule="nonzero" d="M98.871 472.431a4.168 4.168 0 010 8.336H57.288a4.169 4.169 0 010-8.336h41.583zM162.039 408.205h89.154c12.956 0 23.565 10.618 23.565 23.565v24.569c0 12.977-10.587 23.565-23.565 23.565h-89.154c-12.96 0-23.565-10.617-23.565-23.565V431.77c0-12.982 10.583-23.565 23.565-23.565z"/>
            <path fill="#EE9A87" d="M162.039 418.624h89.154c7.231 0 13.146 5.918 13.146 13.146v24.569c0 7.228-5.918 13.146-13.146 13.146h-89.154c-7.228 0-13.146-5.915-13.146-13.146V431.77c0-7.231 5.915-13.146 13.146-13.146z"/>
            <path fill="#213853" fillRule="nonzero" d="M137.619 159.185c11.492 0 21.899 4.66 29.43 12.192 7.532 7.531 12.192 17.938 12.192 29.43 0 22.985-18.637 41.623-41.622 41.623-11.493 0-21.899-4.66-29.431-12.192s-12.192-17.939-12.192-29.431 4.66-21.899 12.192-29.43c7.532-7.532 17.938-12.192 29.431-12.192z"/>
            <path fill="#3A506D" d="M137.619 165.437c19.535 0 35.37 15.835 35.37 35.37 0 19.534-15.835 35.371-35.37 35.371-19.535 0-35.371-15.837-35.371-35.371 0-19.535 15.836-35.37 35.371-35.37z"/>
            <path fill="#213853" fillRule="nonzero" d="M137.619 170.483c8.372 0 15.953 3.395 21.442 8.882 5.487 5.487 8.882 13.07 8.882 21.442 0 8.373-3.395 15.954-8.882 21.443-5.489 5.487-13.07 8.882-21.442 8.882-8.374 0-15.955-3.395-21.442-8.883-5.488-5.487-8.883-13.07-8.883-21.442s3.395-15.954 8.882-21.442c5.489-5.487 13.07-8.882 21.443-8.882z"/>
            <path fill="#AFE3F1" d="M137.619 176.734c13.296 0 24.073 10.777 24.073 24.073 0 13.295-10.777 24.073-24.073 24.073-13.295 0-24.074-10.778-24.074-24.073 0-13.296 10.779-24.073 24.074-24.073z"/>
            <path fill="#213853" fillRule="nonzero" d="M275.443 159.185c22.986 0 41.623 18.637 41.623 41.622 0 11.492-4.66 21.899-12.192 29.431-7.531 7.532-17.938 12.192-29.431 12.192-11.492 0-21.899-4.66-29.431-12.192-7.531-7.532-12.191-17.939-12.191-29.431s4.66-21.899 12.191-29.43c7.532-7.532 17.939-12.192 29.431-12.192z"/>
            <path fill="#374B66" d="M275.443 165.437c19.535 0 35.371 15.835 35.371 35.37 0 19.534-15.836 35.371-35.371 35.371-19.535 0-35.371-15.837-35.371-35.371 0-19.535 15.836-35.37 35.371-35.37z"/>
            <path fill="#213853" fillRule="nonzero" d="M275.443 170.483c8.373 0 15.954 3.395 21.443 8.882 5.487 5.488 8.882 13.07 8.882 21.442s-3.395 15.955-8.883 21.442c-5.487 5.488-13.07 8.883-21.442 8.883-8.373 0-15.955-3.395-21.442-8.883-5.487-5.487-8.883-13.07-8.883-21.442s3.396-15.954 8.883-21.442c5.488-5.487 13.07-8.882 21.442-8.882z"/>
            <path fill="#AFE3F1" d="M275.443 176.734c13.295 0 24.073 10.777 24.073 24.073 0 13.295-10.778 24.073-24.073 24.073s-24.073-10.778-24.073-24.073c0-13.296 10.778-24.073 24.073-24.073z"/>
            <path fill="#213853" fillRule="nonzero" d="M237.741 265.105a6.252 6.252 0 110 12.503h-63.197a6.252 6.252 0 110-12.503h63.197zM191.366 111.116a9.653 9.653 0 016.842 2.835 9.649 9.649 0 012.835 6.843 9.652 9.652 0 01-2.835 6.843 9.648 9.648 0 01-6.842 2.835 9.65 9.65 0 01-6.844-2.835 9.657 9.657 0 01-2.835-6.843 9.653 9.653 0 012.835-6.843 9.657 9.657 0 016.844-2.835z"/>
            <path fill="#3A506D" d="M191.366 115.284a5.51 5.51 0 110 11.02 5.51 5.51 0 110-11.02z"/>
            <path fill="#213853" fillRule="nonzero" d="M221.017 111.116a9.642 9.642 0 016.828 2.835h.015a9.649 9.649 0 012.835 6.843 9.652 9.652 0 01-2.835 6.843l-.296.269a9.634 9.634 0 01-13.374-.269h-.016a9.653 9.653 0 01-2.836-6.843 9.65 9.65 0 012.836-6.843l.296-.269a9.63 9.63 0 016.547-2.566z"/>
            <path fill="#3A506D" d="M221.017 115.284a5.51 5.51 0 11-5.511 5.51 5.51 5.51 0 015.511-5.51z"/>
            <path fill="#fff" d="M131.395 180.117c5.614 0 10.164 4.55 10.164 10.163 0 5.615-4.55 10.164-10.164 10.164s-10.164-4.549-10.164-10.164c0-5.613 4.55-10.163 10.164-10.163zM275.757 180.117c5.614 0 10.163 4.55 10.163 10.163 0 5.615-4.549 10.164-10.163 10.164s-10.164-4.549-10.164-10.164c0-5.613 4.55-10.163 10.164-10.163z"/>
            <path fill="#213853" fillRule="nonzero" d="M172.22 434.377a9.649 9.649 0 016.843 2.835 9.648 9.648 0 012.835 6.842 9.653 9.653 0 01-2.835 6.844 9.653 9.653 0 01-6.843 2.835 9.653 9.653 0 01-6.843-2.835 9.657 9.657 0 01-2.835-6.844 9.653 9.653 0 012.835-6.842 9.652 9.652 0 016.843-2.835z"/>
            <path fill="#3A506D" d="M172.22 438.544a5.51 5.51 0 11.001 11.02 5.51 5.51 0 01-.001-11.02z"/>
            <path fill="#213853" fillRule="nonzero" d="M241.012 434.377a9.632 9.632 0 016.827 2.835h.016a9.65 9.65 0 012.836 6.842 9.654 9.654 0 01-2.836 6.844l-.296.269a9.633 9.633 0 01-6.547 2.566 9.642 9.642 0 01-6.828-2.835h-.015a9.653 9.653 0 01-2.835-6.844 9.648 9.648 0 012.835-6.842l.296-.269a9.628 9.628 0 016.547-2.566z"/>
            <path fill="#3A506D" d="M241.012 438.544a5.511 5.511 0 110 11.022 5.511 5.511 0 010-11.022z"/>
        </svg>
    `;

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create floating button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'gbp-floating-btn';
    buttonContainer.innerHTML = robotSVG;
    // Set positioning based on script attributes
    let positionStyles = 'position: fixed !important;';
    if (scriptTop) positionStyles += `top: ${scriptTop} !important;`;
    if (scriptLeft) positionStyles += `left: ${scriptLeft} !important;`;
    if (scriptBottom) positionStyles += `bottom: ${scriptBottom} !important;`;
    if (scriptRight) positionStyles += `right: ${scriptRight} !important;`;

    // Default to bottom-right if no attributes provided
    if (!scriptTop && !scriptLeft && !scriptBottom && !scriptRight) {
        positionStyles += 'bottom: 30px !important; right: 30px !important;';
    }

    buttonContainer.style.cssText = `
        ${positionStyles}
        width: ${config.size}px !important;
        height: ${config.size}px !important;
        border-radius: 50% !important;
        background: rgb(3, 0, 0) !important;
        cursor: pointer !important;
        z-index: 10 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
        transition: all 0.3s ease !important;
    `;

    console.log('GBP Button container created:', buttonContainer);

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'gbp-tooltip';
    tooltip.textContent = config.tooltipText;
    // Set tooltip position based on button position
    let tooltipPosition = 'bottom: 70px !important;';
    let arrowPosition = 'bottom: -8px !important; border-top: 8px solid #4facfe !important;';

    if (scriptTop) {
        tooltipPosition = 'top: 70px !important;';
        arrowPosition = 'top: -8px !important; border-bottom: 8px solid #4facfe !important;';
    } else if (scriptBottom) {
        tooltipPosition = 'bottom: 70px !important;';
        arrowPosition = 'bottom: -8px !important; border-top: 8px solid #4facfe !important;';
    } else {
        // Default behavior
        tooltipPosition = 'bottom: 70px !important;';
        arrowPosition = 'bottom: -8px !important; border-top: 8px solid #4facfe !important;';
    }

    tooltip.style.cssText = `
        position: absolute !important;
        ${tooltipPosition}
        left: 50% !important;
        transform: translateX(-50%) !important;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
        color: white !important;
        padding: 12px 16px !important;
        border-radius: 12px !important;
        font-size: 14px !important;
        font-weight: 600 !important;
        white-space: nowrap !important;
        opacity: 0 !important;
        visibility: hidden !important;
        transition: all 0.3s ease !important;
        z-index: 11 !important;
        pointer-events: none !important;
    `;

    // Add arrow styling
    const style = document.createElement('style');
    style.textContent = `
        .gbp-tooltip::after {
            ${arrowPosition}
        }
    `;
    document.head.appendChild(style);
    buttonContainer.appendChild(tooltip);

    console.log('GBP Tooltip created and appended');

    // Add hover effects for button positioning
    buttonContainer.addEventListener('mouseenter', () => {
        const currentTop = buttonContainer.style.top;
        const currentBottom = buttonContainer.style.bottom;

        if (currentTop && currentTop !== 'auto') {
            buttonContainer.style.top = `calc(${currentTop} - 10px)`;
        } else if (currentBottom && currentBottom !== 'auto') {
            buttonContainer.style.bottom = `calc(${currentBottom} + 10px)`;
        }
    });

    buttonContainer.addEventListener('mouseleave', () => {
        const originalTop = scriptTop || 'auto';
        const originalBottom = scriptBottom || (scriptTop ? 'auto' : '30px');

        if (originalTop !== 'auto') {
            buttonContainer.style.top = originalTop;
        } else {
            buttonContainer.style.bottom = originalBottom;
        }
    });

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gbp-modal';

    if (config.useEmbeddedForm) {
        // Use embedded form
        modal.innerHTML = `
            <div class="gbp-modal-content">
                <div class="gbp-modal-header">
                    <h2>GBP Suspension Checker</h2>
                    <button class="gbp-modal-close">&times;</button>
                </div>
                <div class="gbp-modal-body">
                    ${embeddedFormHTML}
                </div>
            </div>
        `;

        // Inject embedded CSS
        const embeddedStyle = document.createElement('style');
        embeddedStyle.textContent = embeddedFormCSS;
        document.head.appendChild(embeddedStyle);

        // Initialize embedded form after modal is shown
        modal.addEventListener('transitionend', function initEmbeddedForm() {
            if (modal.classList.contains('show')) {
                initializeEmbeddedForm();
                modal.removeEventListener('transitionend', initEmbeddedForm);
            }
        });
    } else {
        // Use iframe fallback
        modal.innerHTML = `
            <div class="gbp-modal-content">
                <div class="gbp-modal-header">
                    <h2>GBP Suspension Checker</h2>
                    <button class="gbp-modal-close">&times;</button>
                </div>
                <div class="gbp-modal-body">
                    <iframe src="${config.formUrl}" frameborder="0"></iframe>
                </div>
            </div>
        `;
    }

    // Add event listeners
    let tooltipTimeout;

    buttonContainer.addEventListener('mouseenter', () => {
        clearTimeout(tooltipTimeout);
        tooltip.classList.add('show');
    });

    buttonContainer.addEventListener('mouseleave', () => {
        tooltipTimeout = setTimeout(() => {
            tooltip.classList.remove('show');
        }, 300);
    });

    buttonContainer.addEventListener('click', () => {
        modal.classList.add('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    modal.querySelector('.gbp-modal-close').addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Append to body
    document.body.appendChild(buttonContainer);
    document.body.appendChild(modal);

    // Function to change button position
    function changePosition(newPosition) {
        if (!['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(newPosition)) {
            console.error('Invalid position. Use: bottom-right, bottom-left, top-right, or top-left');
            return;
        }

        const button = document.querySelector('.gbp-floating-btn');
        const tooltip = document.querySelector('.gbp-tooltip');

        if (button && tooltip) {
            // Clear all existing positioning styles first
            button.style.top = '';
            button.style.bottom = '';
            button.style.left = '';
            button.style.right = '';
            button.style.position = 'fixed';

            // Update tooltip position classes
            tooltip.classList.remove('gbp-tooltip-bottom', 'gbp-tooltip-top');
            if (newPosition.includes('bottom')) {
                tooltip.classList.add('gbp-tooltip-bottom');
            } else {
                tooltip.classList.add('gbp-tooltip-top');
            }

            // Apply new positioning with !important to override CSS
            if (newPosition === 'bottom-right') {
                button.style.setProperty('bottom', '30px', 'important');
                button.style.setProperty('right', '30px', 'important');
                button.style.setProperty('top', 'auto', 'important');
                button.style.setProperty('left', 'auto', 'important');
            } else if (newPosition === 'bottom-left') {
                button.style.setProperty('bottom', '30px', 'important');
                button.style.setProperty('left', '30px', 'important');
                button.style.setProperty('top', 'auto', 'important');
                button.style.setProperty('right', 'auto', 'important');
            } else if (newPosition === 'top-right') {
                button.style.setProperty('top', '30px', 'important');
                button.style.setProperty('right', '30px', 'important');
                button.style.setProperty('bottom', 'auto', 'important');
                button.style.setProperty('left', 'auto', 'important');
            } else if (newPosition === 'top-left') {
                button.style.setProperty('top', '30px', 'important');
                button.style.setProperty('left', '30px', 'important');
                button.style.setProperty('bottom', 'auto', 'important');
                button.style.setProperty('right', 'auto', 'important');
            }

            console.log(`Floating button position changed to: ${newPosition}`);
        } else {
            console.error('Button or tooltip not found');
        }
    }

    // Function to show/hide button
    function toggleButton(show = true) {
        const button = document.querySelector('.gbp-floating-btn');
        if (button) {
            button.style.display = show ? 'flex' : 'none';
        }
    }

    // Function to update button size
    function updateSize(newSize) {
        const button = document.querySelector('.gbp-floating-btn');
        const svg = button ? button.querySelector('svg') : null;

        if (button && svg) {
            button.style.width = `${newSize}px`;
            button.style.height = `${newSize}px`;
            svg.style.width = `${newSize * 0.75}px`;
            svg.style.height = `${newSize * 0.75}px`;
            svg.style.marginTop = `${newSize * 0.25}px`;
        }
    }

    // Function to update tooltip text
    function updateTooltipText(newText) {
        const tooltip = document.querySelector('.gbp-tooltip');
        if (tooltip) {
            tooltip.textContent = newText;
        }
    }

    // Function to update form URL
    function updateFormUrl(newUrl) {
        config.formUrl = newUrl;
        console.log(`Form URL updated to: ${newUrl}`);
    }

        // Return API for external control (available but not visible)
        window.gbpButton = {
            // Configuration updates
            updateConfig: (newConfig) => {
                Object.assign(config, newConfig);
            },
    
            // Position control
            setPosition: changePosition,
            changePosition: changePosition,
            moveToTopRight: () => changePosition('top-right'),
            moveToTopLeft: () => changePosition('top-left'),
            moveToBottomRight: () => changePosition('bottom-right'),
            moveToBottomLeft: () => changePosition('bottom-left'),
    
            // Visibility control
            show: () => toggleButton(true),
            hide: () => toggleButton(false),
            toggle: () => {
                const button = document.querySelector('.gbp-floating-btn');
                if (button) {
                    toggleButton(button.style.display === 'none');
                }
            },
    
            // Size control
            setSize: updateSize,
            updateSize: updateSize,
    
            // Content control
            setTooltipText: updateTooltipText,
            updateTooltipText: updateTooltipText,
            setFormUrl: updateFormUrl,
            updateFormUrl: updateFormUrl,
    
            // Get current config
            getConfig: () => ({ ...config }),
    
            // Utility functions
            destroy: () => {
                const button = document.querySelector('.gbp-floating-btn');
                const modal = document.querySelector('.gbp-modal');
                if (button) button.remove();
                if (modal) modal.remove();
                console.log('GBP Floating Button destroyed');
            }
        };
    
        // Auto-position based on config (no visible controls)
        if (config.position && config.position !== 'bottom-right') {
            setTimeout(() => {
                changePosition(config.position);
            }, 1000);
        }

        console.log('GBP Button API ready:', window.gbpButton);
    }

    // Initialize embedded form functionality
    function initializeEmbeddedForm() {
        // Function to auto-generate report when questions are answered
        function autoGenerateReport() {
            if (!disclaimerCheckbox.checked) {
                return; // Don't generate if disclaimer not accepted
            }

            const hasAnsweredQuestions = checkIfQuestionsAnswered();
            if (hasAnsweredQuestions && document.getElementById('report-section').style.display === 'none') {
                // Auto-generate report
                generateReportNow();
            }
        }

        // Function to actually generate the report
        function generateReportNow() {
            // Advanced risk calculation based on Google GMB guidelines
            let riskScore = 0;
            let riskFactors = [];
            let recommendations = [];

            // 1. Business Type Assessment (20 points max)
            const businessType = document.querySelector('input[name="business-type"]:checked');
            if (businessType) {
                switch (businessType.value) {
                    case 'Brick-and-mortar store':
                        riskScore += 5; // Lowest risk
                        break;
                    case 'Home-based business':
                        riskScore += 12; // Medium risk
                        riskFactors.push('Home-based business may have higher scrutiny');
                        break;
                    case 'Mobile or service-area business':
                        riskScore += 10; // Medium-low risk
                        break;
                    case 'Online-only business':
                        riskScore += 18; // High risk
                        riskFactors.push('Online-only businesses face stricter verification');
                        break;
                }
            }

            // 2. Location Type Assessment (15 points max)
            const locationCheckboxes = document.querySelectorAll('input[name^="location-type-"]:checked');
            if (locationCheckboxes.length > 0) {
                locationCheckboxes.forEach(checkbox => {
                    const locationType = checkbox.name.replace('location-type-', '');
                    switch (locationType) {
                        case '1': // Private office
                            riskScore += 2;
                            break;
                        case '2': // Shared workspace
                            riskScore += 6;
                            riskFactors.push('Shared workspace may require additional verification');
                            break;
                        case '3': // Virtual office
                            riskScore += 8;
                            riskFactors.push('Virtual offices need strong documentation');
                            break;
                        case '4': // P.O. Box
                            riskScore += 12;
                            riskFactors.push('P.O. Box addresses often flagged by Google');
                            recommendations.push('Consider using a physical business address');
                            break;
                        case '5': // Residential
                            riskScore += 15;
                            riskFactors.push('Residential addresses have highest suspension risk');
                            recommendations.push('Use commercial address if possible');
                            break;
                    }
                });
            }

            // 3. Recent Changes Assessment (10 points max)
            const recentChanges = document.querySelectorAll('input[name^="recently-changes"]:checked');
            if (recentChanges.length > 0) {
                recentChanges.forEach(change => {
                    const changeType = change.name;
                    if (changeType === 'recently-changes') { // Business name
                        riskScore += 4;
                        riskFactors.push('Recent name changes may trigger verification');
                    } else if (changeType === 'recently-changes-2') { // Address
                        riskScore += 6;
                        riskFactors.push('Address changes require re-verification');
                    } else if (changeType === 'recently-changes-3') { // Phone
                        riskScore += 3;
                        riskFactors.push('Phone changes may need verification');
                    }
                });
            }

            // 4. Contact Information Assessment (15 points max)
            const sharedContact = document.querySelector('input[name="shared-contact"]:checked');
            if (sharedContact && sharedContact.value === 'Yes') {
                riskScore += 12;
                riskFactors.push('Shared contact information is a major suspension risk');
                recommendations.push('Use unique phone number and address');
            }

            const phoneType = document.querySelector('input[name="phone-type"]:checked');
            if (phoneType) {
                if (phoneType.value === 'VoIP or call-forwarding service') {
                    riskScore += 10;
                    riskFactors.push('VoIP numbers may not be accepted by Google');
                    recommendations.push('Use a Google-verified phone number');
                }
            }

            // 5. Verification Method Assessment (10 points max)
            const verification = document.querySelector('input[name="verification"]:checked');
            if (verification) {
                if (verification.value === 'Third-party agency') {
                    riskScore += 8;
                    riskFactors.push('Third-party verification may not be recognized');
                } else if (verification.value === 'Dont remember') {
                    riskScore += 6;
                    riskFactors.push('Unverified listings are at higher risk');
                }
            }

            // 6. Account Access Assessment (10 points max)
            const accountAccess = document.querySelector('input[name="account-access"]:checked');
            if (accountAccess && accountAccess.value === 'Its managed by an agency or someone else') {
                riskScore += 8;
                riskFactors.push('Agency-managed accounts need proper access');
                recommendations.push('Ensure you have admin access to your GBP');
            }

            // 7. Signage Assessment (10 points max)
            const signage = document.querySelector('input[name="signage"]:checked');
            if (signage) {
                if (signage.value === 'No signage yet') {
                    riskScore += 8;
                    riskFactors.push('Missing signage is a common suspension reason');
                    recommendations.push('Install clear business signage');
                } else if (signage.value === 'Not applicable (service-area business)') {
                    riskScore += 5;
                    riskFactors.push('Service businesses need alternative verification');
                }
            }

            // 8. Content Quality Assessment (10 points max)
            const stockImages = document.querySelector('input[name="stock-images"]:checked');
            if (stockImages && stockImages.value === 'Yes') {
                riskScore += 8;
                riskFactors.push('Stock images may violate Google\'s content policies');
                recommendations.push('Use original, high-quality photos');
            }

            const fakeReviews = document.querySelector('input[name="fake-reviews"]:checked');
            if (fakeReviews && fakeReviews.value === 'Yes') {
                riskScore += 15;
                riskFactors.push('Fake reviews can lead to immediate suspension');
                recommendations.push('Remove fake reviews and encourage genuine ones');
            }

            // 9. Google Communication Assessment (5 points max)
            const googleEmails = document.querySelectorAll('input[name^="google-emails-"]:checked');
            if (googleEmails.length > 0) {
                googleEmails.forEach(email => {
                    if (email.name === 'google-emails-1') { // Warning received
                        riskScore += 3;
                        riskFactors.push('Previous warnings increase suspension risk');
                        recommendations.push('Address all Google warnings immediately');
                    }
                });
            }

            // Calculate final risk level
            const riskLevel = riskScore < 20 ? { level: 'Low', class: 'risk-low', color: '#28a745' } :
                            riskScore < 40 ? { level: 'Medium', class: 'risk-medium', color: '#ffc107' } :
                            riskScore < 60 ? { level: 'High', class: 'risk-high', color: '#dc3545' } :
                            { level: 'Very High', class: 'risk-critical', color: '#dc3545' };

            // Generate detailed report
            const reportHTML = `
                <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">📊 Google GMB Suspension Risk Assessment</h2>
                <div style="text-align: center; margin: 20px 0;">
                    <div style="width: 150px; height: 150px; border-radius: 50%; background: ${riskLevel.color}; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; margin: 0 auto; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        ${Math.min(riskScore, 100)}%
                    </div>
                    <div style="margin-top: 10px; font-size: 18px; font-weight: bold;">Suspension Risk Score</div>
                    <div style="margin-top: 5px; color: ${riskLevel.color}; font-weight: bold;">${riskLevel.level} Risk</div>
                </div>

                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">🎯 Risk Assessment Summary</h3>
                    <p><strong>Business Type:</strong> ${businessType ? businessType.value : 'Not specified'}</p>
                    <p><strong>Primary Risk Factors:</strong> ${riskFactors.length > 0 ? riskFactors.slice(0, 3).join(', ') : 'None identified'}</p>
                    <p><strong>Overall Status:</strong> <span style="color: ${riskLevel.color}; font-weight: bold;">${riskLevel.level} Suspension Risk</span></p>
                </div>

                ${riskFactors.length > 0 ? `
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #856404; margin-bottom: 15px;">⚠️ Key Risk Factors Identified</h3>
                    <ul style="color: #856404;">
                        ${riskFactors.map(factor => `<li style="margin: 5px 0;">${factor}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                ${recommendations.length > 0 ? `
                <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #155724; margin-bottom: 15px;">💡 Google Compliance Recommendations</h3>
                    <ul style="color: #155724;">
                        ${recommendations.map(rec => `<li style="margin: 5px 0;">${rec}</li>`).join('')}
                        <li>Regularly monitor your GBP listing</li>
                        <li>Keep business information accurate and up-to-date</li>
                        <li>Respond to Google notifications promptly</li>
                        <li>Maintain high-quality, original content</li>
                    </ul>
                </div>
                ` : `
                <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #155724; margin-bottom: 15px;">✅ Good Standing</h3>
                    <p style="color: #155724;">Your business appears to be in good standing with Google's guidelines. Continue maintaining accurate information and high-quality content.</p>
                </div>
                `}

                <div style="background: #e7f3ff; border: 1px solid #b8daff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #004085; margin-bottom: 15px;">📋 Next Steps</h3>
                    <ol style="color: #004085;">
                        <li>Review and address any risk factors identified above</li>
                        <li>Verify all business information is accurate in GBP</li>
                        <li>Ensure you have proper documentation for your business</li>
                        <li>Monitor your listing regularly for any changes</li>
                        <li>Contact Google support if you receive any notifications</li>
                    </ol>
                </div>
            `;

            document.getElementById('report-content').innerHTML = reportHTML;
            document.getElementById('report-section').style.display = 'block';
            document.getElementById('generate-report-btn').style.display = 'none';
        }

        // Function to check if user has answered any questions
        function checkIfQuestionsAnswered() {
            // Check business type (required)
            const businessType = document.querySelector('input[name="business-type"]:checked');
            if (!businessType) return false;

            // Check location types (at least one checkbox)
            const locationTypes = document.querySelectorAll('input[name^="location-type-"]:checked');
            if (locationTypes.length === 0) return false;

            // Check recent changes (at least one checkbox)
            const recentChanges = document.querySelectorAll('input[name^="recently-changes"]:checked');
            if (recentChanges.length === 0) return false;

            // Check shared contact
            const sharedContact = document.querySelector('input[name="shared-contact"]:checked');
            if (!sharedContact) return false;

            // Check phone type
            const phoneType = document.querySelector('input[name="phone-type"]:checked');
            if (!phoneType) return false;

            // Check verification method
            const verification = document.querySelector('input[name="verification"]:checked');
            if (!verification) return false;

            // Check account access
            const accountAccess = document.querySelector('input[name="account-access"]:checked');
            if (!accountAccess) return false;

            // Check signage
            const signage = document.querySelector('input[name="signage"]:checked');
            if (!signage) return false;

            // Check stock images
            const stockImages = document.querySelector('input[name="stock-images"]:checked');
            if (!stockImages) return false;

            // Check fake reviews
            const fakeReviews = document.querySelector('input[name="fake-reviews"]:checked');
            if (!fakeReviews) return false;

            // Check Google emails (at least one checkbox)
            const googleEmails = document.querySelectorAll('input[name^="google-emails-"]:checked');
            if (googleEmails.length === 0) return false;

            return true;
        }

        // Disclaimer handling
        const disclaimerCheckbox = document.getElementById('disclaimer-accept');
        const generateBtn = document.getElementById('generate-report-btn');
        const sections = document.querySelectorAll('.form-section:not(.disclaimer-section)');

        if (disclaimerCheckbox && generateBtn) {
            disclaimerCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    generateBtn.disabled = false;
                    sections.forEach(section => section.classList.remove('disabled-section'));
                } else {
                    generateBtn.disabled = true;
                    sections.forEach(section => section.classList.add('disabled-section'));
                }
            });

            // Signage change handling
            const signageRadios = document.querySelectorAll('input[name="signage"]');
            const staffedQuestions = document.getElementById('staffed-questions');

            if (staffedQuestions) {
                signageRadios.forEach(radio => {
                    radio.addEventListener('change', function() {
                        if (this.value === 'Yes, permanently visible signage' || this.value === 'No signage yet') {
                            staffedQuestions.style.display = 'block';
                        } else {
                            staffedQuestions.style.display = 'none';
                        }
                        // Check for auto-generation after change
                        setTimeout(autoGenerateReport, 500);
                    });
                });
            }

            // Add change listeners to all form inputs for auto-generation
            const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            allInputs.forEach(input => {
                input.addEventListener('change', function() {
                    // Check for auto-generation after a short delay
                    setTimeout(autoGenerateReport, 500);
                });
            });

            // Generate report functionality (manual button)
            generateBtn.addEventListener('click', function() {
                if (!disclaimerCheckbox.checked) {
                    alert('Please accept the disclaimer first.');
                    return;
                }

                // Check if user has selected any options
                const hasAnsweredQuestions = checkIfQuestionsAnswered();
                if (!hasAnsweredQuestions) {
                    alert('कृपया कम से कम कुछ प्रश्नों का उत्तर दें! (Please answer at least some questions!)');
                    return;
                }

                generateReportNow();
            });
        }

        // Form submission
        const suspensionForm = document.getElementById('suspension-form');
        if (suspensionForm) {
            suspensionForm.addEventListener('submit', async function(e) {
                e.preventDefault();

                const formData = new FormData(this);
                formData.append('apiKey', 'aiFORM_29Vv8Kkd3HrT3zfQbNhpF85mV');

                try {
                    const response = await fetch('https://form-backend-mu.vercel.app/api/form', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (response.ok) {
                        document.getElementById('success-message').style.display = 'block';
                        document.getElementById('error-message').style.display = 'none';
                        this.reset();
                    } else {
                        throw new Error(result.error || 'Failed to submit');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    document.getElementById('success-message').style.display = 'none';
                    document.getElementById('error-message').style.display = 'block';
                }
            });
        }
    }

    // Initialize the button
    initGBPButton();
})();