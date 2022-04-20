import React from 'react'
import { useHistory } from 'react-router-dom'

import '../style/pages/MainHome.scss'
import HeroImage from '../assests/image-hero.png'
import TextTransition, { presets } from "react-text-transition";
// import Logo from '../assests/logo.png'

const TEXTS = [
    "Quality",
    "Passion",
    "Perfection",
    "Prioritization",
    "Goals"
  ];

function MainHome() {
    const history = useHistory()
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(() =>
            setIndex(index => index + 1),
            3000 // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    return (
        <div className='main_hero_container'>
            {/* <div class="bouncing-text">
                <img src={Logo} className='main_logo' />
                <div class="b">h</div>
                <div class="o">u</div>
                <div class="u">d</div>
                <div class="n">d</div>
                <div class="c">l</div>
                <div class="e">e</div>
                <div class="shadow"></div>
                <div class="shadow-two"></div>
            </div> */}
            <div className='content'>
                <div className='content_description'>
                    <div className='content-heading'>We work for <span><TextTransition noOverflow text={ TEXTS[index % TEXTS.length] } springConfig={ presets.wobbly } /></span> not for quantity</div>
                    <div className='content-description'>Start getting massive engagement from real people on Instagram  with the best in class grows automation tools
                    Start getting massive engagement from real people on Instagram  with the best in class grows automation tools</div>
                    <div className='button_container'>
                        <button className='button' onClick={() => { history.push('/login') }}>Login to your Account</button>
                        <button className='button' onClick={() => { history.push('/register') }}>Start your journey</button>
                    </div>
                </div>
                <div className='img_container'>
                    <img src={HeroImage} />
                </div>
            </div>
        </div>
    )
}

export default MainHome