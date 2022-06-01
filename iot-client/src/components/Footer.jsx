/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

function Footer() {
    return (
        <div class="bg-primary" style={{ width: '100%' }}>
            <footer class="bg-light text-center text-white">
                <div class="container p-4 pb-0">
                    <section class="mb-4">
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#3b5998' }}
                            href="https://www.facebook.com/nvthong2303/"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-facebook-f"></i
                        ></a>
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#55acee' }}
                            href="https://twitter.com/Thng09149598"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-twitter"></i
                        ></a>
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#dd4b39' }}
                            href="mailto: nvthong2303@gmail.com"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-google"></i
                        ></a>
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#ac2bac' }}
                            href="https://www.instagram.com/thomg23/"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-instagram"></i
                        ></a>
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#0082ca' }}
                            href="https://www.linkedin.com/in/nguy%E1%BB%85n-v%C4%83n-th%C3%B4ng-768360194/"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-linkedin-in"></i
                        ></a>
                        <a
                            class="btn btn-primary btn-floating m-1"
                            style={{ backgroundColor: '#333333' }}
                            href="https://github.com/nvthong2303"
                            role="button"
                            target="_blank"
                        ><i class="fab fa-github"></i
                        ></a>
                    </section>
                </div>
                <div class="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2020 Copyright:
                    <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;