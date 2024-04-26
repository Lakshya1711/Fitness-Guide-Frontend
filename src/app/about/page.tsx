// import Head from 'next/head';
import './about.css';

const About = () => {
    return (
        <div className="container">
            <h1>
                <title>About Page</title>
            </h1>
            <section className="section">
                <h2>About the Project</h2>
                <p>
                    Welcome to our fitness and tracking website! We're dedicated to helping you achieve your fitness goals and live a healthier lifestyle.
                    Our platform provides you with tools and resources to track your workouts, monitor your progress, and stay motivated along your fitness journey.
                    Whether you're a seasoned athlete or just getting started, we're here to support you every step of the way.
                    Feel free to explore our site and discover all the features we have to offer. Get started today and take control of your health and fitness!
                </p>
            </section>
            <section className="section">
                <h2>Developer Details</h2>
                <div className="developer">
                    <div>
                        <img src="/Lakshya.jpg" alt="Developer 1" />
                    </div>
                    <div>
                        <p><strong>Lakshya Srivastava</strong></p>
                        <p>201B147</p>
                        <p>Email: 201B147@juetguna.com</p>
                        <p>Phone: 9532633199</p>
                    </div>
                </div>
                <div className="developer">
                    <div>
                        <img src="/Mohini.jpeg" alt="Developer 2" />
                    </div>
                    <div>
                        <p><strong>Mohini Dhakad</strong></p>
                        <p>201B157</p>
                        <p>Email: 201B157@juetguna.com</p>
                        <p>Phone: 7828480378</p>
                    </div>
                </div>
                <div className="developer">
                    <div>
                        <img src="/Prince.jpeg" alt="Developer 3" />
                    </div>
                    <div>
                        <p><strong>Prince Kumar</strong></p>
                        <p>201B198</p>
                        <p>Email: 201B198@juetguna.com</p>
                        <p>Phone: 9262838497</p>
                    </div>
                </div>
            </section>
            <section className="Contact">
                <h2>Contact Details</h2>
                <p>Name: Lakshya Srivastava</p>
                <p>Email: Lucky17sh@gmail.com</p>
                <p>Phone: 9532633199</p>
            </section>
        </div>
    );
};

export default About;
