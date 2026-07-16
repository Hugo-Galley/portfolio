import { useState, useRef, useEffect } from 'react';
import '../Styles/CardOpenSource.css';

export default function CardOpenSource({ nom, role, repo, desc }) {
    const [isHovered, setIsHovered] = useState(false);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [stars, setStars] = useState(null);
    const cardRef = useRef(null);

    useEffect(() => {
        if (repo) {
            fetch(`https://api.github.com/repos/${repo}`)
                .then(res => res.json())
                .then(data => {
                    if (data.stargazers_count !== undefined) {
                        setStars(data.stargazers_count);
                    }
                })
                .catch(console.error);
        }
    }, [repo]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateXValue = ((y - centerY) / centerY) * -15;
        let rotateYValue = ((x - centerX) / centerX) * 15;
        
        if (isFlipped) {
            rotateYValue = -rotateYValue;
        }
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    const handleClick = () => {
        if (desc) setIsFlipped(!isFlipped);
    };

    return (
        <div 
            className="os-wrapper" 
            style={{ perspective: '1000px' }}
            onClick={handleClick}
        >
            <div 
                ref={cardRef}
                className="os-container"
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
                        minHeight: '280px',
                        width: '100%'
                    }}
                >
                    <p className="os-nom">{nom}</p>
                    
                    <div style={{ 
                        opacity: isFlipped ? 0 : 1, 
                        transition: 'opacity 0.3s ease',
                        position: isFlipped ? 'absolute' : 'relative',
                        visibility: isFlipped ? 'hidden' : 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <p className="os-role">{role}</p>
                        
                        <div className="os-img-container">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100" fill="currentColor">
                                <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" /> 
                            </svg>
                        </div>
                        
                        {stars !== null && (
                            <div className="os-stars">
                                <svg className="star-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span>{stars}</span>
                            </div>
                        )}
                    </div>

                    <div style={{ 
                        opacity: isFlipped ? 1 : 0, 
                        transition: 'opacity 0.3s ease', 
                        position: isFlipped ? 'relative' : 'absolute',
                        visibility: isFlipped ? 'visible' : 'hidden',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', flexDirection: 'column', justifyContent: 'center' 
                    }}>
                        <p style={{ fontSize: '15px', lineHeight: '1.5', padding: '0 10px', color: 'var(--text-color)' }}>{desc}</p>
                    </div>
                </div>
                {isHovered && (
                    <div 
                        className="glare" 
                        style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
                            pointerEvents: 'none', borderRadius: 'inherit', transform: 'translateZ(1px)'
                        }}
                    />
                )}
            </div>
        </div>
    );
}
