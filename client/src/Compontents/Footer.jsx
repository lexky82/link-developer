import React from 'react'
import { GithubOutlined, HomeOutlined, MailOutlined } from "@ant-design/icons";

function Footer() {
    return (
            <footer className="footer" style={{ textAlign: 'center', borderTop: '1px solid black'}}>

                <div style={{ backgroundColor: 'white', fontSize: '22px' }}>
                    <a href="mailto:lexky82@gmail.com"><MailOutlined /></a>
                    <a href="https://tried.tistory.com/"><HomeOutlined /></a>
                    <a href="https://github.com/lexky82"><GithubOutlined /></a>
                </div>


                <div style={{ backgroundColor: 'black', color: 'white' }}>
                    Copyright © Kwon Hyeok Jin 2021
                <div style={{ fontSize: '22px' }}>

                    </div>

                </div>
            </footer>
    )
}

export default Footer
