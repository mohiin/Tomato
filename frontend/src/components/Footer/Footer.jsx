
import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-top">
            <div className="footer-left">
                <h2>Tomato</h2>
                <p>Tomato is a fast, easy-to-use food delivery service that brings delicious meals
                    from local restaurants straight to your door. Order, track, and enjoy—no hassle,
                    just great food!
                </p>
            </div>
            <div className="footer-center">
                <h2>Compay</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>Social Links</h2>
                <div className="social-icon">
                    <p><i className="fa-brands fa-facebook"></i></p>
                    <p><i className="fa-brands fa-x-twitter"></i></p>
                    <p><i className="fa-brands fa-instagram"></i></p>
                    <p><i className="fa-brands fa-linkedin"></i></p>
                    <p className="yt"><i className="fa-brands fa-youtube"></i></p>
                </div>
            </div>
           
            </div>
            <hr />
            <div className="footer-bottom">
                <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, 
                    Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
                    2008-2024 © Tomato™ Ltd. All rights reserved.
                </p>
            </div>
        </div>
    )
}