import { useState, useRef } from 'react';
import '../Styles/CardWork.css';

export default function CardWork({ nom, boite, img, duree, desc }) {
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation values (max rotation is 15 degrees)
        const rotateXValue = ((y - centerY) / centerY) * -15;
        let rotateYValue = ((x - centerX) / centerX) * 15;
        
        // Reverse X movement when flipped so it feels natural
        if (isFlipped) {
            rotateYValue = -rotateYValue;
        }
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    const handleClick = () => {
        if (desc) {
            setIsFlipped(!isFlipped);
        }
    };

    return (
        <div 
            className="work-wrapper" 
            style={{ perspective: '1000px' }}
            onClick={handleClick}
        >
            <div 
                ref={cardRef}
                className="work-container"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: isHovered 
                        ? `rotateX(${rotateX}deg) rotateY(${isFlipped ? rotateY + 180 : rotateY}deg) scale3d(1.05, 1.05, 1.05)` 
                        : `rotateX(0deg) rotateY(${isFlipped ? 180 : 0}deg) scale3d(1, 1, 1)`,
                    transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
                    cursor: desc ? 'pointer' : 'default',
                    transformStyle: 'preserve-3d',
                    position: 'relative'
                }}
            >
                <div 
                    className="card-content" 
                    style={{ 
                        transform: `translateZ(30px) ${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`, 
                        pointerEvents: 'none',
                        transition: 'transform 0.5s ease',
                        position: 'relative',
                        minHeight: '280px'
                    }}
                >
                    <p className="work-nom">{nom}</p>
                    
                    <div style={{ 
                        opacity: isFlipped ? 0 : 1, 
                        transition: 'opacity 0.3s ease',
                        position: isFlipped ? 'absolute' : 'relative',
                        visibility: isFlipped ? 'hidden' : 'visible'
                    }}>
                        <p className="work-boite">{boite}</p>
                        <img src={img} alt={boite} width="200" height="200" loading="lazy" decoding="async" />
                        <p className="work-duree">{duree}</p>
                    </div>

                    <div style={{ 
                        opacity: isFlipped ? 1 : 0, 
                        transition: 'opacity 0.3s ease', 
                        position: isFlipped ? 'relative' : 'absolute',
                        visibility: isFlipped ? 'visible' : 'hidden',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center' 
                    }}>
                        <p className="work-desc" style={{ fontSize: '15px', lineHeight: '1.5', padding: '0 10px', color: 'var(--text-color)' }}>{desc}</p>
                    </div>
                </div>
                {/* Glare effect */}
                {isHovered && (
                    <div 
                        className="glare" 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                            pointerEvents: 'none',
                            borderRadius: 'inherit',
                            transform: 'translateZ(1px)'
                        }}
                    />
                )}
            </div>
        </div>
    );
}
