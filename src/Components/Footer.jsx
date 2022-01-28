import React, { Component } from 'react';
import { FaFacebookSquare, FaDiscord, FaLinkedinIn, FaInstagram } from "react-icons/fa";



export default function Footer() {
    return (
        <section>
            <footer className="footer-content">
                <h3>Qurrit</h3>
                <p>Qurrit is a one stop shop for fitness. Screen through a large variety of top class workouts.</p>
                <ul class="socials">
                    <li><a href="#"><i><FaInstagram /></i></a></li>
                    <li><a href="#"><i ><FaFacebookSquare /></i></a></li>
                    <li><a href="#"><i ><FaLinkedinIn /></i></a></li>
                    <li><a href="#"><i><FaDiscord /></i></a></li>
                </ul>
                <div class="footer-bottom">
                    <p>copyright &copy;2021 <a href="#">Qurrit</a>  </p>
                    <div class="footer-menu">
                        <ul class="f-menu">
                            <li><a href="">Home</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Contact</a></li>
                            <li><a href="">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </section>
    )
}